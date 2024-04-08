import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { AvisoHelpersService } from 'src/app/compartido/services/aviso-helpers.service';
import { Mercaderia } from 'src/app/modulos/mercaderias/model/mercaderia';
import { MercaderiasService } from 'src/app/modulos/mercaderias/services/mercaderias.service';
import { ItemMovimiento } from '../../model/itemMovimiento';
import { ModoEdicion } from '../../../../compartido/enums/modoEdicion.enum';
import { HelpersService } from '../../../../compartido/services/helpers.service';
import { MovimientosService } from '../../services/movimientos.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoIngresarTextoComponent } from '../../../../compartido/componentes/dialogo-ingresar-texto/dialogo-ingresar-texto.component';

@Component({
  selector: 'app-lista-items',
  templateUrl: './lista-items.component.html',
  styleUrls: ['./lista-items.component.scss']

})
export class ListaItemsComponent implements OnInit {

  @Input() movimientoFormGroup: FormGroup = this._movimientosService.crearMovimientoFormGroup();
  @Input() modoEdicion!: string;

  @ViewChild('itemsTable') itemsTable!: MatTable<any>; //ViewChild sirve para acceder a un elemento del html

  protected formItemToAgregar: FormGroup = this._movimientosService.crearItemFormGroup();
  protected listaMercaderias: Mercaderia[] = [];
  protected listaMercaderiasFiltrado$: Observable<Mercaderia[]> | undefined;
  protected columnasAMostrarItems: string[] = ['_id', 'descripcion', 'cantidad', 'valorUnitario', 'subtotal', 'acciones'];


  constructor(
    private _avisoHelpersService: AvisoHelpersService,
    private _mercaderiasService: MercaderiasService,
    private _movimientosService: MovimientosService,
    private _dialogo: MatDialog) {

  }

  ngOnInit(): void {
    this.listarFiltrarMercaderias();
    this.verificarModoEdicion();
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

  public isModoEditarOVisualizar() {
    return HelpersService.isModoEditar(this.modoEdicion)
      || HelpersService.isModoVisualizar(this.modoEdicion);
  }

  private inhabilitarCampos() {
    this.formItemToAgregar.disable();
  }

  private listarFiltrarMercaderias() {
    let control = this.formItemToAgregar.get('mercaderia');

    this._mercaderiasService.listarTodosMercaderiasActivos().subscribe({
      next: (respuesta: Mercaderia[]) => {
        this.listaMercaderias = respuesta;

        // Se ejecuta cuando se escribe en autocomplete
        this.listaMercaderiasFiltrado$ = control?.valueChanges.pipe(
          startWith(''), // Se inicia con valor vacío para listar todos los registros
          map(valorAFiltrar => {
            if (valorAFiltrar) {
              return this.listaMercaderias?.filter(mercaderia =>
                mercaderia._id?.toString().includes(valorAFiltrar || '') ||
                mercaderia.descripcion?.toUpperCase().includes(HelpersService.convertirToMayus(valorAFiltrar) || '')
              );
            } else {
              return this.listaMercaderias; // Devuelve la lista sin filtrar si valorAFiltrar es vacío
            }
          }
          )
        );
      },
      error: () => this._avisoHelpersService.mostrarMensaje('Error al listar Mercaderias', '', 4000) // Mensaje cuando ocurre un error
    });
  }

  public displayMercaderia(mercaderia: Mercaderia): string {
    if (HelpersService.isNoNulo(mercaderia) && mercaderia._id) {
      return mercaderia.descripcion
        ? mercaderia._id + ' - ' + mercaderia.descripcion
        : mercaderia._id;
    }

    return '';
  }

  public agregarItem() {
    let itemsArray = this.movimientoFormGroup.get('items') as FormArray;

    let nuevoItem: ItemMovimiento = new ItemMovimiento();
    nuevoItem.mercaderia = this.formItemToAgregar.get('mercaderia')?.value;
    nuevoItem.cantidad = this.formItemToAgregar.get('cantidad')?.value;
    nuevoItem.valorUnitario = this.formItemToAgregar.get('valorUnitario')?.value;
    nuevoItem.numItem = itemsArray.length + 1;

    if (this.verificarValidaciones() && this.validarItem(nuevoItem)) {
      itemsArray.push(this._movimientosService.crearItemFormGroup(nuevoItem));

      this.limpiarCamposItemAgregar();
      this.refrescarTablaItems();
    }

  }

  public removerItem(itemARemover: ItemMovimiento) {
    const movCuentasContables = this.movimientoFormGroup.get('movimientoCuentasContables') as FormArray;

    if (movCuentasContables.length > 0) {
      this._avisoHelpersService.mostrarMensaje("Remueva primero el financiero!");
      return;
    }

    let itemsArray = this.movimientoFormGroup.get('items') as FormArray;

    const indexItemARemover = itemsArray.controls.findIndex((control) => {
      const controlValue = JSON.stringify(control.value);
      const itemARemoverValue = JSON.stringify(this._movimientosService.crearItemFormGroup(itemARemover).value);

      return controlValue === itemARemoverValue;
    });

    if (indexItemARemover !== -1) {
      itemsArray.removeAt(indexItemARemover);
    }

    this.actualizarNumeroItem();
  }

  private refrescarTablaItems() {
    this.itemsTable.renderRows();
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

  private isItemYaAgregado(itemAAgregar: ItemMovimiento): boolean {
    let itemsArray = this.movimientoFormGroup.get('items') as FormArray;

    for (let itemArray of itemsArray.controls) {
      const itemControlValue = itemArray.value as ItemMovimiento;

      if (itemAAgregar.mercaderia === itemControlValue.mercaderia
        && itemAAgregar.valorUnitario === itemControlValue.valorUnitario) {
        return true;
      }
    }

    return false;
  }

  private validarItem(nuevoItem: ItemMovimiento): boolean {
    let isValido: boolean = true;
    let mensaje: string = '';

    if (HelpersService.isNuloOrVacio(nuevoItem.mercaderia)
      || HelpersService.isNuloOrVacioOrUndefined(nuevoItem.mercaderia._id)) {
      this.formItemToAgregar.get('mercaderia')?.setValue("");
      mensaje = 'Seleccione una mercaderia!';
      isValido = false;
    }
    else if (HelpersService.isNuloOrVacio(nuevoItem.cantidad)) {

      mensaje = 'Ingrese una cantidad!';
      isValido = false;
    }
    else if (HelpersService.isNuloOrVacio(nuevoItem.valorUnitario)) {
      mensaje = 'Ingrese un valor unitario!';
      isValido = false;
    }
    else if (this.isItemYaAgregado(nuevoItem)) {
      mensaje = 'La mercaderia seleccionada ya fue agregada con la misma cantidad y valor unitario!';
      isValido = false;
    }

    if (!isValido) {
      this._avisoHelpersService.mostrarMensaje(mensaje);
    }

    return isValido;
  }

  protected limpiarCamposItemAgregar() {
    this.formItemToAgregar.reset();
  }

  onChangeMercaderia() {
    this.formItemToAgregar.get('cantidad')?.setValue(1);
  }

  abrirDialogoObsItem(itemSeleccionado: ItemMovimiento): void {
    const dialogRef = this._dialogo.open(DialogoIngresarTextoComponent, {
      data: {
        titulo: 'Observación del item',
        textoInicial: itemSeleccionado.observacion,
        isModoLectura: HelpersService.isModoVisualizar(this.modoEdicion)
      }
    });

    dialogRef.afterClosed().subscribe(textoAlterado => { //Al cerrar dialogo

      if (textoAlterado && !HelpersService.isModoVisualizar(this.modoEdicion)) {
        itemSeleccionado.observacion = textoAlterado;

        let itemsArray: FormArray = this.movimientoFormGroup.get('items') as FormArray;

        for (let item of itemsArray.controls) {
          if (item instanceof FormGroup) {
            if (itemSeleccionado.numItem === item.controls['numItem'].value) {
              item.controls['observacion'].setValue(textoAlterado);
              break;
            }
          }
        }
      }
    });
  }

  private actualizarNumeroItem() {
    let itemsArray = this.movimientoFormGroup.get('items') as FormArray;
    let contador: number = 0;

    for (let item of itemsArray.controls) {
      if (item instanceof FormGroup) {
        item.controls['numItem'].setValue(contador + 1);
        contador = contador + 1;
      }
    }
  }

}
