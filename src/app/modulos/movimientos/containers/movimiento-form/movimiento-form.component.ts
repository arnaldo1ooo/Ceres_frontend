import { FechaHelpersService } from './../../../../compartido/services/fecha-helpers.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { ErrorHelpersService } from 'src/app/compartido/services/error-helpers.service';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { Departamento } from 'src/app/modulos/departamentos/model/departamento';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';
import { EntidadesService } from 'src/app/modulos/entidades/services/entidades.service';
import { Moneda } from 'src/app/modulos/monedas/models/moneda';
import { MonedasService } from 'src/app/modulos/monedas/services/monedas.service';
import { TiposMovimientoService } from 'src/app/modulos/tipos-movimiento/services/tipos-movimiento.service';

import { MovimientoDetalleDTO } from '../../model/dtos/movimientoDetalleDTO';
import { ModoOperacion } from './../../../../compartido/enums/modoOperacion.enum';
import { AvisoHelpersService } from './../../../../compartido/services/aviso-helpers.service';
import { ClaseEntidad } from './../../../entidades/enums/clase-entidad.enum';
import { Entidad } from './../../../entidades/models/entidad';

@Component({
  selector: 'app-movimiento-form',
  templateUrl: './movimiento-form.component.html',
  styleUrls: ['./movimiento-form.component.scss']
})

export class MovimientoFormComponent implements OnInit {
  public listaMonedas: Moneda[] = [];

  public listaEntidades: Entidad[] = [];
  public listaEntidadesFiltrado$: Observable<Entidad[]> | undefined;

  public listaDepartamentos: Departamento[] = [];

  public listaCompradoresVendedores: Entidad[] = [];
  public listaCompradoresVendedoresFiltrado$: Observable<Entidad[]> | undefined;

  public listaSituaciones = Object.values(Situacion);
  public formMovimientoDetalle: FormGroup = this.formPorDefecto();

  private modoOperacion: string = this._ruta.snapshot.data['modoOperacion'];  //Recibe el modo desde el path

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _monedasService: MonedasService,
    private _entidadesService: EntidadesService,
    private _departamentosService: DepartamentosService,
    private _avisoHelpersService: AvisoHelpersService,
    private _tiposMovimientoService: TiposMovimientoService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.verificarModoOperacion();

    this.listarMonedas();
    this.listarFiltrarEntidades();
    this.listarDepartamentos();

    this.cargarDatos();
  }

  public onGuardar() {
    /* if(this.formMercaderia.valid) { //Verifica los validators de cada campo del form
       this._mercaderiaService.guardar(this.formMercaderia.value)
       .subscribe(resultado => this.onExito(), error => this.onError());
     }
     else {
       this.formMercaderia.markAllAsTouched(); //Marca todos los campos invalidos
       this._avisoHelpersService.mostrarMensajeDatosInvalidosForm();
     }*/
  }

  public onCancelar() {
    this._location.back(); //Para que retroceda de pagina
  }

  private onExito() {
    this._avisoHelpersService.mostrarMensaje('Movimiento guardado con exito!', '', 4000);  //Mensaje cuando salva correctamente
    this.onCancelar(); //Para que vuelva atras
  }

  private onError() {
    this._avisoHelpersService.mostrarMensaje('Error al guardar Movimiento', '', 4000); //Mensaje cuando da error
  }

  protected compararOpcionesSelect(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionRecibida);
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.formMovimientoDetalle.get(nombreCampo); //Obtenemos el elemento
    return ErrorHelpersService.verificarMensajeError(campo);
  }

  public verificarModoOperacion() {
    switch(this.modoOperacion) {
      case ModoOperacion.MODO_NUEVO:
        this.formMovimientoDetalle.get('situacion')?.disable();
        break;

      case ModoOperacion.MODO_EDITAR:
        break;

      case ModoOperacion.MODO_VISUALIZAR:
        this.formMovimientoDetalle.disable();
        break;
    }
  }

  private listarMonedas() {
    this._monedasService.listarTodosMonedas().subscribe((respuesta: any) => {
      this.listaMonedas = respuesta;
    })
  }

  private listarFiltrarEntidades() {
    const idsClaseEntidad: string = ClaseEntidad.ID_CLIENTE; //Poner entre coma ej: 1,2,3..

    this._entidadesService.listarEntidadesPorClases(idsClaseEntidad).subscribe((respuesta: any) => {
      this.listaEntidades = respuesta;

      //Se ejecuta cuando se escribe en autocomplete
      this.listaEntidadesFiltrado$ = this.formMovimientoDetalle.get('entidad')?.valueChanges.pipe(
        startWith(''), //Se inicia con valor vacio para listar todos los registros
        map(valorAFiltrar =>
          this.listaEntidades?.filter(entidad =>
            entidad._id?.toString().includes(valorAFiltrar || '') ||
            entidad.nombre?.toLocaleLowerCase().includes(valorAFiltrar || '') ||
            entidad.apellido?.toLocaleLowerCase().includes(valorAFiltrar || ''))
        )
      ), () => this._avisoHelpersService.mostrarMensaje('Error al listar Entidades', '', 4000); //Mensaje cuando da error;
    })
  }

  public displayEntidad(entidad: Entidad): string {
    if (entidad._id && entidad.nombre) {
      return entidad._id + " - " + entidad.nombre + (entidad.apellido ? ' ' + entidad.apellido : '');
    }
    else {
      return '';
    }
  }

  private listarDepartamentos() {
    this._departamentosService.listarTodosDepartamentos().subscribe((respuesta: any) => {
      this.listaDepartamentos = respuesta;
    })
  }

  private async cargarDatos() {
    //Carga datos de movimiento en caso en modo editar
    let movimientoDetalle: MovimientoDetalleDTO = this._ruta.snapshot.data['movimiento'];  //Obtiene el objeto del resolver

    //Si es nuevo
    if (movimientoDetalle._id == null || movimientoDetalle._id == '') {
      movimientoDetalle = new MovimientoDetalleDTO();

      movimientoDetalle._id = '0';
      //Await sirve para esperar hasta que retorne el llamado para continuar la ejecucion
      movimientoDetalle.tipo = await this._tiposMovimientoService.cargarPorId(this._tiposMovimientoService.getIdTipoMovSeleccionado());
      movimientoDetalle.fechaEmision = FechaHelpersService.getFechaHoraActualLDT();
      movimientoDetalle.situacion = Situacion.ACTIVO;
    }

    this.formMovimientoDetalle.setValue({ //Setamos los datos para que aparezca al editar o visualizar
      _id: movimientoDetalle._id,
      tipo: movimientoDetalle.tipo,
      moneda: movimientoDetalle.moneda,
      entidad: movimientoDetalle.entidad,
      fechaEmision: movimientoDetalle.fechaEmision,
      departamento: movimientoDetalle.departamento,
      compradorVendedor: movimientoDetalle.compradorVendedor,
      observacion: movimientoDetalle.observacion,
      situacion: movimientoDetalle.situacion,
      items: movimientoDetalle.items
    });


  }

  private formPorDefecto(): FormGroup {
    return this._formBuilder.group(
      {
        _id: [''],
        tipo: ['', Validators.required],
        moneda: ['', Validators.required],
        entidad: ['', Validators.required],
        fechaEmision: ['', Validators.required],
        departamento: ['', Validators.required],
        compradorVendedor: ['', Validators.required],
        observacion: ['', Validators.maxLength(500)],
        situacion: ['', Validators.required],
        items: ['', Validators.required]
      }
    )
  }
}
