import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
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
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ListaItemsComponent } from '../../components/lista-items/lista-items.component';
import { MonedaEnum } from '../../../monedas/models/moneda';
import { MovimientosService } from '../../services/movimientos.service';
import { LoginService } from '../../../login/services/login.service';

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
  public modoEdicion: string = this._ruta.snapshot.data['modoEdicion']; //Proviene del routing

  public movimientoDetalleDTO: MovimientoDetalleDTO = new MovimientoDetalleDTO();
  public formMovimientoDetalle: FormGroup = this._movimientosService.crearMovimientoFormGroup();

  public INDEX_TAB_MERCADERIAS = 1;

  @ViewChild(ListaItemsComponent) listaItemsComponent!: ListaItemsComponent;

  constructor(
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _movimientosService: MovimientosService,
    private _monedasService: MonedasService,
    private _entidadesService: EntidadesService,
    private _departamentosService: DepartamentosService,
    private _avisoHelpersService: AvisoHelpersService,
    private _tiposMovimientoService: TiposMovimientoService,
    private _loginService: LoginService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.verificarModoEdicion();
    this.cargarDatosMovimiento();

    this.listarMonedas();
    this.listarFiltrarEntidades();
    this.listarDepartamentos();
    this.listarFiltrarCompradoresVendedores();
  }

  //Se ejecuta luego de que se hayan cargado todos los componentes
  ngAfterViewInit(): void {

  }

  public onGuardar() {

    console.log(this.movimientoDetalleDTO);
    if (this.formMovimientoDetalle.valid) { //Verifica los validators de cada campo del form
      /*this._movimientosService.guardar(this.formMovimientoDetalle.getRawValue())
        .subscribe({
          next: () => this.onExito(),
          error: error => this.onError()
        });*/
      console.log("Es valido")
    }
    else {
      this.formMovimientoDetalle.markAllAsTouched(); //Marca todos los campos invalidos
      this._avisoHelpersService.mostrarMensajeDatosInvalidosForm();
    }
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
    if (entidad && entidad._id && entidad.nombre) {
      return entidad._id + " - " + entidad.nombre + (entidad.apellido ? ' ' + entidad.apellido : '');
    }

    return '';
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

  private async cargarDatosMovimiento() {
    //Carga datos de movimiento en caso en modo editar
    this.movimientoDetalleDTO = this._ruta.snapshot.data['movimiento'];  //Obtiene el objeto del resolver

    //Si es nuevo
    if (HelpersService.isNuloOrVacio(this.movimientoDetalleDTO._id)) {
      this.movimientoDetalleDTO = new MovimientoDetalleDTO();

      this.movimientoDetalleDTO._id = '0';
      this.movimientoDetalleDTO.tipo = await this._tiposMovimientoService.cargarPorId(HelpersService.obtenerItemDelStorage('idTipoMovimiento')); //Await sirve para esperar hasta que retorne el llamado para continuar la ejecucion
      this.movimientoDetalleDTO.moneda = await this._monedasService.cargarPorId(MonedaEnum.GUARANI);
      this.movimientoDetalleDTO.fechaEmision = FechaHelpersService.getFechaHoraActualLDT();
      this.movimientoDetalleDTO.situacion = Situacion.ACTIVO;
      this.movimientoDetalleDTO.departamento = this._loginService.loginSesionActual.departamento;
      this.movimientoDetalleDTO.formaPago = FormaPago.EFECTIVO;
    }

    this.cargarDatosObjectEnForm();

  }

  public agregarItemALista(item: ItemMovimiento) {
    this.movimientoDetalleDTO.items.push(item);
    (this.formMovimientoDetalle.get('items') as FormArray).push(this._movimientosService.crearItemFormGroup(item));
  }

  public cargarDatosObjectEnForm() {
    this.formMovimientoDetalle.setValue({
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

  public cargarDatosFormEnObject() {
    this.movimientoDetalleDTO.tipo = this.formMovimientoDetalle.get('tipo')?.value;
    this.movimientoDetalleDTO.moneda = this.formMovimientoDetalle.get('moneda')?.value;
    this.movimientoDetalleDTO.entidad = this.formMovimientoDetalle.get('entidad')?.value;
    this.movimientoDetalleDTO.fechaEmision = this.formMovimientoDetalle.get('fechaEmision')?.value;
    this.movimientoDetalleDTO.departamento = this.formMovimientoDetalle.get('departamento')?.value;
    this.movimientoDetalleDTO.compradorVendedor = this.formMovimientoDetalle.get('compradorVendedor')?.value;
    this.movimientoDetalleDTO.observacion = this.formMovimientoDetalle.get('observacion')?.value;
    this.movimientoDetalleDTO.situacion = this.formMovimientoDetalle.get('situacion')?.value;
    this.movimientoDetalleDTO.formaPago = this.formMovimientoDetalle.get('formaPago')?.value;
  }

  tabChange(changeEvent: MatTabChangeEvent) {
    if (changeEvent.index == this.INDEX_TAB_MERCADERIAS) {
      this.cargarDatosFormEnObject();
      this.listaItemsComponent.movimiento = this.movimientoDetalleDTO;
    }
  }

}
