import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_TAMANHOS } from 'src/app/compartido/constantes/constantes';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';

import { MovimientosComponent } from '../../containers/movimientos/movimientos.component';
import { MovimientoListaDTO, Page } from '../../model/dtos/movimientoListaDTO';
import { Movimiento } from '../../model/movimiento';


@Component({
  selector: 'app-movimientos-lista',
  templateUrl: './movimientos-lista.component.html',
  styleUrls: ['./movimientos-lista.component.scss']
})
export class MovimientosListaComponent implements OnInit {

  //Input entra en el componente, Output sale del componente hacia otro componente
  @Input() listMovimientosListaDTO: MovimientoListaDTO[] = [];
  @Input() pageResponse: Page | undefined;
  @Input() pageRequest!: PageRequest; //Recibe el request default

  @Output() mostrarTiposMovimientoSeleccion = new EventEmitter(false);
  @Output() visualizar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() eliminar = new EventEmitter(false);
  @Output() inactivar = new EventEmitter(false);

  @ViewChild(MatPaginator) paginador: MatPaginator | undefined;

  protected readonly columnasAMostrar = ['_id', 'tipo', 'nombreApellidoEntidad', 'fechaEmision', 'departamento', 'total', 'situacion', 'acciones'];
  protected tamanhosPage = DEFAULT_PAGE_TAMANHOS;
  protected isMostrarSimboloMoneda: boolean = true;

  constructor(private _movimientosComponent: MovimientosComponent) { }

  ngOnInit(): void {

  }

  onMostrarTiposMovimientoSeleccion() {
    this.mostrarTiposMovimientoSeleccion.emit(true);
  }

  onVisualizar(movimiento: Movimiento) {
    this.visualizar.emit(movimiento);
  }

  onEditar(movimiento: Movimiento) {
    this.editar.emit(movimiento);
  }

  onEliminar(movimiento: MovimientoListaDTO) {
    this.eliminar.emit(movimiento);
  }

  onInactivar(movimiento: MovimientoListaDTO) {
    this.inactivar.emit(movimiento);
  }

  onCambiarPage(event: PageEvent) {
    if (this.listMovimientosListaDTO.length > 0) {
      this.pageRequest.pagina = event.pageIndex; //Asignamos el numero de pagina
      this.pageRequest.tamanho = event.pageSize;  //Asignamos el tamaño de las pagina

      this._movimientosComponent.refrescar(this.pageRequest);
    }
  }

}
