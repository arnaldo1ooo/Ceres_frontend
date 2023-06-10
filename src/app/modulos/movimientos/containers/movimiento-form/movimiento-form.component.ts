import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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

import { EntradaSalida } from '../../../../compartido/enums/entradaSalida.enum';
import { MovimientoDetalleDTO } from '../../model/dtos/movimientoDetalleDTO';
import { ModoEdicion } from '../../../../compartido/enums/modoEdicion.enum';
import { AvisoHelpersService } from './../../../../compartido/services/aviso-helpers.service';
import { FechaHelpersService } from './../../../../compartido/services/fecha-helpers.service';
import { ClaseEntidad } from './../../../entidades/enums/clase-entidad.enum';
import { Entidad } from './../../../entidades/models/entidad';
import { ItemMovimiento } from '../../model/item-movimiento';
import { FormaPago } from '../../enums/formaPago.enum';

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
  public listaFormasPago = Object.values(FormaPago);
  public movimientoDetalleDTO: MovimientoDetalleDTO = new MovimientoDetalleDTO();

  public formMovimientoDetalle: FormGroup = this.formMovimientoInit();

  public modoEdicion: string = this._ruta.snapshot.data['modoEdicion']; //Proviene del routing

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
    this.verificarModoEdicion();
    this.cargarDatos();

    this.listarMonedas();
    this.listarFiltrarEntidades();
    this.listarDepartamentos();
    this.listarFiltrarCompradoresVendedores();
  }

  public onGuardar() {
    /* if(this.formMercaderia.valid) { //Verifica los validators de cada campo del form
       this._mercaderiaService.guardar(this.formMercaderia.getRawValue())
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

  private verificarModoEdicion() {
    switch (this.modoEdicion) {
      case ModoEdicion.MODO_NUEVO:
        this.formMovimientoDetalle.get('situacion')?.disable();
        break;

      case ModoEdicion.MODO_EDITAR:
        this.formMovimientoDetalle.get('situacion')?.disable();
        break;

      case ModoEdicion.MODO_VISUALIZAR:
        this.formMovimientoDetalle.disable();
        break;
    }
  }

  private listarMonedas() {
    this._monedasService.listarTodosMonedas().subscribe({
      next: (respuesta: Moneda[]) => {
        this.listaMonedas = respuesta;
      },
      error: () => this._avisoHelpersService.mostrarMensaje('Error al listar Monedas', '', 4000)
    });
  }

  private listarFiltrarEntidades() {
    const idsClaseEntidad: string = ClaseEntidad.ID_CLIENTE; // Poner entre comas ej: 1,2,3..

    this._entidadesService.listarEntidadesPorClases(idsClaseEntidad).subscribe({
      next: (respuesta: Entidad[]) => {
        this.listaEntidades = respuesta;

        // Se ejecuta cuando se escribe en autocomplete
        this.listaEntidadesFiltrado$ = this.formMovimientoDetalle.get('entidad')?.valueChanges.pipe(
          startWith(''), // Se inicia con valor vacío para listar todos los registros
          map(valorAFiltrar =>
            this.listaEntidades?.filter(entidad =>
              entidad._id?.toString().includes(valorAFiltrar || '') ||
              entidad.nombre?.toLocaleLowerCase().includes(valorAFiltrar || '') ||
              entidad.apellido?.toLocaleLowerCase().includes(valorAFiltrar || ''))
          )
        );
      },
      error: () => this._avisoHelpersService.mostrarMensaje('Error al listar Entidades', '', 4000) // Mensaje cuando ocurre un error
    });
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
    this._departamentosService.listarTodosDepartamentos().subscribe({
      next: (respuesta: Departamento[]) => {
        this.listaDepartamentos = respuesta;
      },
      error: () => this._avisoHelpersService.mostrarMensaje('Error al listar Departamentos', '', 4000)
    });
  }

  private listarFiltrarCompradoresVendedores() {
    const idsClaseEntidad: string = this.formMovimientoDetalle.get('tipo')?.value.tipo == EntradaSalida.ENTRADA
      ? ClaseEntidad.ID_COMPRADOR
      : ClaseEntidad.ID_VENDEDOR;

    this._entidadesService.listarEntidadesPorClases(idsClaseEntidad).subscribe({
      next: (respuesta: Entidad[]) => {
        this.listaCompradoresVendedores = respuesta;

        //Se ejecuta cuando se escribe en autocomplete
        this.listaCompradoresVendedoresFiltrado$ = this.formMovimientoDetalle.get('compradorVendedor')?.valueChanges.pipe(
          startWith(''),
          map(valorAFiltrar =>
            this.listaCompradoresVendedores?.filter(entidad =>
              entidad._id?.toString().includes(valorAFiltrar || '') ||
              entidad.nombre?.toLocaleLowerCase().includes(valorAFiltrar || '') ||
              entidad.apellido?.toLocaleLowerCase().includes(valorAFiltrar || ''))
          )
        );
      },
      error: () => this._avisoHelpersService.mostrarMensaje('Error al listar Compradores Vendedores', '', 4000)
    });
  }

  private async cargarDatos() {
    //Carga datos de movimiento en caso en modo editar
    this.movimientoDetalleDTO = this._ruta.snapshot.data['movimiento'];  //Obtiene el objeto del resolver

    //Si es nuevo
    if (this.movimientoDetalleDTO._id == null || this.movimientoDetalleDTO._id == '') {
      this.movimientoDetalleDTO = new MovimientoDetalleDTO();

      this.movimientoDetalleDTO._id = '0';
      //Await sirve para esperar hasta que retorne el llamado para continuar la ejecucion
      this.movimientoDetalleDTO.tipo = await this._tiposMovimientoService.cargarPorId(this._tiposMovimientoService.getIdTipoMovSeleccionado());
      this.movimientoDetalleDTO.fechaEmision = FechaHelpersService.getFechaHoraActualLDT();
      this.movimientoDetalleDTO.situacion = Situacion.ACTIVO;
    }

    this.formMovimientoDetalle.setValue({ //Setamos los datos para que aparezca al editar o visualizar
      _id: this.movimientoDetalleDTO._id,
      tipo: this.movimientoDetalleDTO.tipo,
      moneda: this.movimientoDetalleDTO.moneda,
      entidad: this.movimientoDetalleDTO.entidad,
      fechaEmision: this.movimientoDetalleDTO.fechaEmision,
      departamento: this.movimientoDetalleDTO.departamento,
      compradorVendedor: this.movimientoDetalleDTO.compradorVendedor,
      observacion: this.movimientoDetalleDTO.observacion,
      situacion: this.movimientoDetalleDTO.situacion,
      items: this.movimientoDetalleDTO.items,
      formaPago: this.movimientoDetalleDTO.formaPago
    });

  }

  private formMovimientoInit(): FormGroup {
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
        items: ['', Validators.required],
        formaPago: ['']
      }
    )
  }

  public agregarItemALista(item: ItemMovimiento) {
    this.movimientoDetalleDTO.items.push(item);
  }




  /*abrirDialogoQuillEditor(): void {
    const dialogRef = this._dialogo.open(DialogoQuillEditorComponent, {
      data: {
        titulo: 'Observación del movimiento',
        textoInicial: this.formMovimientoDetalle.get('observacion')?.value,
        modoLectura: this.modoOperacion == ModoOperacion.MODO_VISUALIZAR
      }
    });

    dialogRef.afterClosed().subscribe(textoAlterado => { //Al cerrar dialogo
      if(textoAlterado) {
        this.formMovimientoDetalle.get('observacion')?.setValue(textoAlterado);
      }
    });
  }*/

}
