import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { ErrorHelpersService } from 'src/app/compartido/services/error-helpers.service';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';
import { EntidadesService } from 'src/app/modulos/entidades/services/entidades.service';
import { Moneda } from 'src/app/modulos/monedas/models/moneda';
import { MonedasService } from 'src/app/modulos/monedas/services/monedas.service';

import { MovimientoDetalleDTO } from '../../model/dtos/movimientoDetalleDTO';
import { AvisoHelpersService } from './../../../../compartido/services/aviso-helpers.service';
import { Departamento } from './../../../departamentos/model/departamento';
import { ClaseEntidad } from './../../../entidades/enums/clase-entidad.enum';
import { Entidad } from './../../../entidades/models/entidad';
import { TipoMovimiento } from './../../../tipos-movimiento/models/tipo-movimiento';

@Component({
  selector: 'app-movimiento-form',
  templateUrl: './movimiento-form.component.html',
  styleUrls: ['./movimiento-form.component.scss']
})

export class MovimientoFormComponent implements OnInit {
  public listaMonedas: any;

  public listaEntidades!: Entidad[];
  public listaEntidadesFiltrado$: Observable<Entidad[]> | undefined;

  public listaDepartamentos: any;
  public listaSituaciones = Object.values(Situacion);
  public formMovimientoDetalle!: FormGroup;

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _monedasService: MonedasService,
    private _entidadesService: EntidadesService,
    private _departamentosService: DepartamentosService,
    private _avisoHelpersService: AvisoHelpersService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente

    this.formMovimientoDetalle = this.formInicial();

    this.listarMonedas();
    this.listarFiltrarEntidades();
    this.listarDepartamentos();

    //En caso que sea modo editar
    const movimientoDetalle: MovimientoDetalleDTO = this._ruta.snapshot.data['movimiento'];  //Obtiene el objeto del resolver

    this.formMovimientoDetalle.setValue({ //Setamos los datos para que aparezca al editar o visualizar
      _id: movimientoDetalle._id,
      tipo: movimientoDetalle.tipo,
      moneda: movimientoDetalle.moneda,
      entidad: movimientoDetalle.entidad,
      fechaEmision: movimientoDetalle.fechaEmision,
      departamento: movimientoDetalle.departamento,
      compradorVendedor: movimientoDetalle.compradorVendedor,
      observacion: movimientoDetalle.observacion,
      situacion: HelpersService.isNoNuloYNoVacio(movimientoDetalle.situacion)
        ? movimientoDetalle.situacion
        : Situacion.ACTIVO, //Se pone por default Activo
      items: movimientoDetalle.items
    });

    this.verificarModo();
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

  public verificarModo() {
    if (this.isModoVisualizar()) {
      this.formMovimientoDetalle.disable(); //Inactiva campos del form
    }
  }

  public isModoVisualizar(): boolean {
    return HelpersService.isModoVisualizar(this._ruta.snapshot.routeConfig?.path);
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
    console.log(entidad)
    if(entidad) {
      return entidad._id + " - " + entidad.nombre + " " + entidad.apellido;
    }
    else {
      return "";
    }
  }

  private listarDepartamentos() {
    this._departamentosService.listarTodosDepartamentos().subscribe((respuesta: any) => {
      this.listaDepartamentos = respuesta;
    })
  }

  private formInicial(): FormGroup {
    return this._formBuilder.group(
      {
        _id: [''],
        tipo: [new TipoMovimiento(), Validators.required],
        moneda: [new Moneda(), Validators.required],
        entidad: [new Entidad(), Validators.required],
        fechaEmision: ['', Validators.required],
        departamento: [new Departamento(), Validators.required],
        compradorVendedor: [new Entidad(), Validators.required],
        observacion: ['', Validators.maxLength(500)],
        situacion: ['', Validators.required],
        items: ['', Validators.required]
      }
    )
  }
}
