import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MovimientosService } from '../../services/movimientos.service';
import { CuentaContableDTO } from '../../model/dtos/cuentaContableDTO';
import { map, Observable, startWith } from 'rxjs';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { CuentasContablesService } from '../../services/cuentas-contables.service';
import { AvisoHelpersService } from 'src/app/compartido/services/aviso-helpers.service';
import { ModoEdicion } from 'src/app/compartido/enums/modoEdicion.enum';
import { MovimientoCuentaContable } from '../../model/movimientoCuentaContable';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-lista-financiero',
  templateUrl: './lista-financiero.component.html',
  styleUrls: ['./lista-financiero.component.scss']
})
export class ListaFinancieroComponent {

  @Input() movimientoFormGroup: FormGroup = this._movimientosService.crearMovimientoFormGroup();
  @Input() modoEdicion!: string;

  @ViewChild('movCuentasContablesTable') movCuentasContablesTable!: MatTable<any>; //ViewChild sirve para acceder a un elemento del html

  protected formMovimientoCuentaToAgregar: FormGroup = this._movimientosService.crearMovimientoCuentaFormGroup();
  protected listaCuentasContables: CuentaContableDTO[] = [];
  protected listaCuentasContablesFiltrado$: Observable<CuentaContableDTO[]> | undefined;
  protected columnasAMostrarItems: string[] = ['_id', 'valor'];

  constructor(
    private _movimientosService: MovimientosService,
    private _cuentasContablesService: CuentasContablesService,
    private _avisoHelpersService: AvisoHelpersService) {

  }

  ngOnInit(): void {
    this.listarFiltrarCuentasContables();
    this.verificarModoEdicion();
  }

  public displayCuentaContable(cuentaContableDTO: CuentaContableDTO): string {
    if (HelpersService.isNoNulo(cuentaContableDTO) && cuentaContableDTO._id) {
      return cuentaContableDTO.nombre
        ? cuentaContableDTO._id + ' - ' + cuentaContableDTO.nombre
        : cuentaContableDTO._id;
    }

    return '';
  }

  public agregarCuentaContable() {
    let nuevoMovCuentaContable: MovimientoCuentaContable = new MovimientoCuentaContable();
    nuevoMovCuentaContable._id = this.formMovimientoCuentaToAgregar.get('_id')?.value;
    nuevoMovCuentaContable.valor = this.formMovimientoCuentaToAgregar.get('valor')?.value;

    if (this.verificarValidaciones() && this.validarMovCuentaContable(nuevoMovCuentaContable)) {

      (this.movimientoFormGroup.get('movimientoCuentasContables') as FormArray)
        .push(this._movimientosService.crearMovimientoCuentaFormGroup(nuevoMovCuentaContable));

      this.limpiarCamposMovCuentaContableAgregar();
      this.refrescarTablaMovCuentasContables();
    }
  }

  private listarFiltrarCuentasContables() {
    let control = this.formMovimientoCuentaToAgregar.get('_id.cuentaContable');

    this._cuentasContablesService.listarTodosCuentasContablesActivos().subscribe({
      next: (respuesta: CuentaContableDTO[]) => {
        this.listaCuentasContables = respuesta;

        // Se ejecuta cuando se escribe en autocomplete
        this.listaCuentasContablesFiltrado$ = control?.valueChanges.pipe(
          startWith(''), // Se inicia con valor vacío para listar todos los registros
          map(valorAFiltrar =>
            this.listaCuentasContables?.filter(cuentaContable =>
              cuentaContable._id?.toString().includes(valorAFiltrar || '') ||
              cuentaContable.nombre?.toLocaleLowerCase().includes(valorAFiltrar || ''))
          )
        );
      },
      error: () => this._avisoHelpersService.mostrarMensaje('Error al listar Cuentas Contables', '', 4000) // Mensaje cuando ocurre un error
    });
  }

  private verificarModoEdicion() {
    switch (this.modoEdicion) {
      case ModoEdicion.MODO_NUEVO:
        break;

      case ModoEdicion.MODO_EDITAR:
        this.inhabilitarCampos();
        break;

      case ModoEdicion.MODO_VISUALIZAR:
        this.inhabilitarCampos();
        break;
    }
  }

  private inhabilitarCampos() {
    this.formMovimientoCuentaToAgregar.disable();
  }

  private verificarValidaciones(): boolean {
    let isValido: boolean = true;
    let mensaje: string = '';

    if (HelpersService.isNuloOrVacio(this.movimientoFormGroup.get('moneda')?.value._id)) {
      mensaje = 'Seleccione la moneda del movimiento!';
      isValido = false;
    }

    if (!isValido) {
      this._avisoHelpersService.mostrarMensaje(mensaje, '', 4000);
    }

    return isValido;
  }

  private validarMovCuentaContable(nuevoMovCuentaContable: MovimientoCuentaContable): boolean {
    let isValido: boolean = true;
    let mensaje: string = '';

    if (HelpersService.isNuloOrVacio(nuevoMovCuentaContable._id.cuentaContable._id)) {
      mensaje = 'Seleccione una cuenta contable!';
      isValido = false;
    }
    else if (HelpersService.isNuloOrVacio(nuevoMovCuentaContable.valor)) {
      mensaje = 'Ingrese un valor para la cuenta contable!';
      isValido = false;
    }
    else if (HelpersService.isMenorIgualACero(nuevoMovCuentaContable.valor)) {
      mensaje = 'Ingrese valor mayor a cero!';
      isValido = false;
    }

    if (!isValido) {
      this._avisoHelpersService.mostrarMensaje(mensaje);
    }

    return isValido;
  }

  protected limpiarCamposMovCuentaContableAgregar() {
    this.formMovimientoCuentaToAgregar.reset();
  }

  private refrescarTablaMovCuentasContables() {
    this.movCuentasContablesTable.renderRows();
  }


}
