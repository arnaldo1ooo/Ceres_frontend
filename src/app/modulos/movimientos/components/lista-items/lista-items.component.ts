import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { AvisoHelpersService } from 'src/app/compartido/services/aviso-helpers.service';
import { Mercaderia } from 'src/app/modulos/mercaderias/model/mercaderia';
import { MercaderiasService } from 'src/app/modulos/mercaderias/services/mercaderias.service';
import { ItemMovimiento } from '../../model/item-movimiento';
import { Movimiento } from '../../model/movimiento';
import { ModoEdicion } from '../../../../compartido/enums/modoEdicion.enum';

@Component({
  selector: 'app-lista-items',
  templateUrl: './lista-items.component.html',
  styleUrls: ['./lista-items.component.scss']
})
export class ListaItemsComponent implements OnInit {

  @Input() movimiento: Movimiento = new Movimiento(); //Se recibe el movimiento
  @Input() modoEdicion: string = '';
  @Output() itemToAgregarEvent: EventEmitter<ItemMovimiento> = new EventEmitter<ItemMovimiento>();;  //Sirve para emitir el nuevo item y agregar a la lista desde el movimiento form

  @ViewChild('tablaItems') tablaItems!: MatTable<any>; //ViewChild sirve para acceder a un elemento del html

  protected formItemToAgregar: FormGroup = this._formBuilder.group(
    {
      mercaderia: [''],
      cantidad: [''],
      valorUnitario: ['']
    }
  );

  protected listaMercaderias: Mercaderia[] = [];
  protected listaMercaderiasFiltrado$: Observable<Mercaderia[]> | undefined;
  protected columnasAMostrarItems: string[] = ['_id', 'descripcion', 'cantidad', 'valorUnitario'];

  constructor(
    private _avisoHelpersService: AvisoHelpersService,
    private _mercaderiasService: MercaderiasService,
    private _formBuilder: NonNullableFormBuilder) {

  }

  ngOnInit(): void {
    this.listarFiltrarMercaderias();
    this.formItemToAgregar;
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

  private inhabilitarCampos() {
    this.formItemToAgregar.disable();
  }

  private listarFiltrarMercaderias() {
    let control = this.formItemToAgregar.get('mercaderia');

    this._mercaderiasService.listarTodosMercaderias().subscribe({
      next: (respuesta: Mercaderia[]) => {
        this.listaMercaderias = respuesta;

        // Se ejecuta cuando se escribe en autocomplete
        this.listaMercaderiasFiltrado$ = control?.valueChanges.pipe(
          startWith(''), // Se inicia con valor vacío para listar todos los registros
          map(valorAFiltrar =>
            this.listaMercaderias?.filter(mercaderia =>
              mercaderia._id?.toString().includes(valorAFiltrar || '') ||
              mercaderia.descripcion?.toLocaleLowerCase().includes(valorAFiltrar || ''))
          )
        );
      },
      error: () => this._avisoHelpersService.mostrarMensaje('Error al listar Mercaderias', '', 4000) // Mensaje cuando ocurre un error
    });
  }

  public displayMercaderia(mercaderia: Mercaderia): string {
    if (mercaderia._id) {
      return mercaderia.descripcion
        ? mercaderia._id + ' - ' + mercaderia.descripcion
        : mercaderia._id;
    }

    return '';
  }

  public agregarItem() {
    let nuevoItem: ItemMovimiento = new ItemMovimiento();

    nuevoItem.mercaderia = this.formItemToAgregar.get('mercaderia')?.value;
    nuevoItem.cantidad = this.formItemToAgregar.get('cantidad')?.value;
    nuevoItem.valorUnitario = this.formItemToAgregar.get('valorUnitario')?.value;

    this.itemToAgregarEvent.emit(nuevoItem); //Enviamos el nuevo item por el evento output

    this.refrescarTablaItems();
  }

  private refrescarTablaItems() {
    this.tablaItems.renderRows();
  }

}
