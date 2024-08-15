import { TipoMovimiento } from './../../../tipos-movimiento/models/tipo-movimiento';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { ErrorHelpersService } from 'src/app/compartido/services/error-helpers.service';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { Departamento } from 'src/app/modulos/departamentos/model/departamento.model';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';
import { EntidadesService } from 'src/app/modulos/entidades/services/entidades.service';
import { Moneda, MonedaEnum } from 'src/app/modulos/monedas/models/moneda';
import { MonedasService } from 'src/app/modulos/monedas/services/monedas.service';
import { TiposMovimientoService } from 'src/app/modulos/tipos-movimiento/services/tipos-movimiento.service';

import { EntradaSalida } from '../../../../compartido/enums/entradaSalida.enum';
import { MovimientoDetalleDTO } from '../../model/dtos/movimientoDetalleDTO';
import { ModoEdicion } from '../../../../compartido/enums/modoEdicion.enum';
import { AvisoHelpersService } from './../../../../compartido/services/aviso-helpers.service';
import { FechaHelpersService } from './../../../../compartido/services/fecha-helpers.service';
import { ClaseEntidad } from './../../../entidades/enums/clase-entidad.enum';
import { Entidad } from '../../../entidades/models/entidad.model';
import { ItemMovimiento } from '../../model/itemMovimiento';
import { FormaPago } from '../../enums/formaPago.enum';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ListaItemsComponent } from '../../components/lista-items/lista-items.component';
import { MovimientosService } from '../../services/movimientos.service';
import { LoginService } from '../../../login/services/login.service';
import { MatSelect } from '@angular/material/select';
import { MovimientoCuentaContable } from '../../model/movimientoCuentaContable';
import { ListaFinancieroComponent } from '../../components/lista-financiero/lista-financiero.component';
import { MonedaHelpersService } from 'src/app/compartido/services/moneda-helpers.service';

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
  public totalItems = 0;

  public formMovimientoDetalle: FormGroup = this._movimientosService.crearMovimientoFormGroup();

  public INDEX_TAB_DATOS_INICIALES = 0;
  public INDEX_TAB_MERCADERIAS = 1;
  public INDEX_TAB_FINANCIERO = 2;

  @ViewChild('movimientoTabGroup') movimientoTabGroup!: MatTabGroup;
  @ViewChild('monedaSelect') monedaSelect!: MatSelect;
  @ViewChild('entidadInputAC') entidadInputAC!: ElementRef;
  @ViewChild('departamentoSelect') departamentoSelect!: MatSelect;
  @ViewChild('compradorVendeorInput') compradorVendeorInput!: ElementRef;
  @ViewChild('formaPagoSelect') formaPagoSelect!: MatSelect;
  @ViewChild(ListaItemsComponent) listaItemsComponent!: ListaItemsComponent;
  @ViewChild(ListaFinancieroComponent) listaFinancieroComponent!: ListaFinancieroComponent;

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

    this.actualizarTotalItems(); //Actualiza la primera vez
    this.itemsChange(); //Actualiza cada vez que cambia items
  }

  private async cargarDatosMovimiento() {
    try {
      //Carga datos de movimiento en caso en modo editar
      let movimientoDetalleDTO: MovimientoDetalleDTO = this._ruta.snapshot.data['movimiento'];  //Obtiene el objeto del resolver

      //Si es nuevo
      if (HelpersService.isNuloOrVacio(movimientoDetalleDTO._id)) {
        this.cargarDatosEnForm(
          '0',
          await this._tiposMovimientoService.cargarPorId(HelpersService.obtenerItemDelLocalStorage('idTipoMovimiento')), //Await sirve para esperar hasta que retorne el llamado para continuar la ejecucion);
          await this._monedasService.cargarPorId(MonedaEnum.GUARANI),
          new Entidad(),
          FechaHelpersService.getFechaHoraActual(),
          this._loginService.getDepartamentoLogado(),
          new Entidad(),
          '',
          Situacion.ACTIVO,
          [],
          FormaPago.EFECTIVO,
          []
        )
      }
      else { //Is Editar
        this.cargarDatosEnForm(
          movimientoDetalleDTO._id,
          movimientoDetalleDTO.tipo,
          movimientoDetalleDTO.moneda,
          movimientoDetalleDTO.entidad,
          movimientoDetalleDTO.fechaEmision,
          movimientoDetalleDTO.departamento,
          movimientoDetalleDTO.compradorVendedor,
          movimientoDetalleDTO.observacion,
          movimientoDetalleDTO.situacion,
          movimientoDetalleDTO.items,
          movimientoDetalleDTO.formaPago,
          movimientoDetalleDTO.movimientoCuentasContables
        )
      }

      this.listarFiltrarCompradoresVendedores();
    }
    catch (error) {
      throw error;
    }
  }

  public onGuardar() {

    if (this.isCamposValidos()) { //Verifica los validators de cada campo del form
      this._movimientosService.guardar(this.formMovimientoDetalle.getRawValue())
        .subscribe({
          next: () => this.onExito(),
          error: error => this.onError()
        });
    }
    else {
      this.formMovimientoDetalle.markAllAsTouched(); //Marca todos los campos invalidos
    }
  }

  private isCamposValidos(): boolean {
    let isValido: boolean = true;
    let mensaje: string = '';

    if (HelpersService.isNuloOrVacio(this.monedaSelect.value._id)) {
      mensaje = "Seleccione una moneda!"
      isValido = false;

      setTimeout(() => { this.monedaSelect.focus(); }, 100);
    }
    else if (HelpersService.isNuloOrVacio(this.entidadInputAC.nativeElement.value)) {
      mensaje = "Seleccione una entidad!"
      isValido = false;
      this.moverseDeTab(this.INDEX_TAB_DATOS_INICIALES);
      setTimeout(() => { this.entidadInputAC.nativeElement.focus(); }, 100);
    }
    else if (HelpersService.isNuloOrVacio(this.departamentoSelect.value._id)) {
      mensaje = "Seleccione una departamento!"
      isValido = false;
      this.moverseDeTab(this.INDEX_TAB_DATOS_INICIALES);
      setTimeout(() => { this.departamentoSelect.focus(); }, 100);
    }
    else if (HelpersService.isNuloOrVacio(this.compradorVendeorInput.nativeElement.value)) {
      mensaje = "Seleccione un comprador o vendedor!"
      isValido = false;
      this.moverseDeTab(this.INDEX_TAB_DATOS_INICIALES);
      setTimeout(() => { this.compradorVendeorInput.nativeElement.focus(); }, 100);
    }
    else if (HelpersService.isNuloOrVacio(this.formaPagoSelect.value)) {
      mensaje = "Seleccione una Forma de pago!"
      isValido = false;
      this.moverseDeTab(this.INDEX_TAB_DATOS_INICIALES);
      setTimeout(() => { this.formaPagoSelect.focus(); }, 100);
    }
    else if (this.formMovimientoDetalle.get('items')?.value?.length == 0) {
      mensaje = "Agregue al menos un item!"
      isValido = false;
      this.moverseDeTab(this.INDEX_TAB_MERCADERIAS);
    }
    else if (this.formMovimientoDetalle.get('movimientoCuentasContables')?.value.length == 0) {
      mensaje = "Agregue al menos una cuenta contable en el Financiero!"
      isValido = false;
      this.moverseDeTab(this.INDEX_TAB_FINANCIERO);
    }
    else if (this.listaFinancieroComponent.saldoLanzar > 0) {
      mensaje = "Existe saldo a lanzar en el financiero!"
      isValido = false;
      this.moverseDeTab(this.INDEX_TAB_FINANCIERO);
    }

    if (!isValido) {
      this._avisoHelpersService.mostrarMensaje(mensaje);
    }

    return isValido;

  }

  private moverseDeTab(tab: number) {
    this.movimientoTabGroup.selectedIndex = tab;
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
        this.formMovimientoDetalle.get('fechaEmision')?.disable();
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

  private cargarDatosEnForm(id: string, tipo: TipoMovimiento, moneda: Moneda, entidad: Entidad,
    fechaEmision: Date | null, departamento: Departamento, compradorVendedor: Entidad,
    observacion: string, situacion: Situacion | null, items: ItemMovimiento[], formaPago: FormaPago | null,
    movCuentasContables: MovimientoCuentaContable[]) {

    this.formMovimientoDetalle.patchValue({
      _id: id,
      tipo: tipo,
      moneda: moneda,
      entidad: entidad,
      fechaEmision: fechaEmision,
      departamento: departamento,
      compradorVendedor: compradorVendedor,
      observacion: observacion,
      situacion: situacion,
      formaPago: formaPago,
      movCuentasContables: movCuentasContables
    });

    //Se setea el array por separado para evitar error
    for (let item of items) {
      this.addItem(item);
    }

    for (let movCuentaContable of movCuentasContables) {
      this.addMovCuentaContable(movCuentaContable);
    }

  }

  private addItem(item: ItemMovimiento) {
    (this.formMovimientoDetalle.get('items') as FormArray)
      .push(this._movimientosService.crearItemFormGroup(item));
  }

  private addMovCuentaContable(movCuentaContable: MovimientoCuentaContable) {
    (this.formMovimientoDetalle.get('movimientoCuentasContables') as FormArray)
      .push(this._movimientosService.crearMovimientoCuentaFormGroup(movCuentaContable));
  }

  private itemsChange() {
    this.formMovimientoDetalle.get('items')?.valueChanges.subscribe(() => {
      this.actualizarTotalItems();
    });
  }

  private actualizarTotalItems() {
    let items = this.formMovimientoDetalle.get('items') as FormArray;
    let cantidad;
    let valorUnitario;
    this.totalItems = 0;

    for (let i = 0; i < items.length; i++) {
      cantidad = items.at(i).get('cantidad')?.value;
      valorUnitario = items.at(i).get('valorUnitario')?.value;
      this.totalItems = this.totalItems + (cantidad * valorUnitario);
    }
  }

  protected tabOnChange(tabChangeEvent: MatTabChangeEvent): void {
    if(tabChangeEvent.index == this.INDEX_TAB_FINANCIERO) {
      this.listaFinancieroComponent.formMovimientoCuentaToAgregar.get('valor')?.setValue(this.totalItems);
      this.listaFinancieroComponent.actualizarSaldoLanzar();
    }
  }

  public formatearValorMoneda(valor: number, moneda: any): string {
    return MonedaHelpersService.formatearValorMoneda(valor, moneda);
  }

}
