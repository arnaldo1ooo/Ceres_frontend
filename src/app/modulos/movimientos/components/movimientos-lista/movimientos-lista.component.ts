import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { DEFAULT_PAGE_TAMANHOS } from 'src/app/compartido/constantes/constantes';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { AvisoHelpersService } from 'src/app/compartido/services/aviso-helpers.service';
import { JasperService } from 'src/app/compartido/services/jasper-helpers.service';
import { MonedaHelpersService } from 'src/app/compartido/services/moneda-helpers.service';

import { MovimientosComponent } from '../../containers/movimientos/movimientos.component';
import { MovimientoListaDTO, Page } from '../../model/dtos/movimientoListaDTO';
import { Movimiento } from '../../model/movimiento.model';
import { MovimientosService } from '../../services/movimientos.service';


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

  constructor(private _movimientosComponent: MovimientosComponent,
    private _movimientosService: MovimientosService,
    private _avisoHelpersService: AvisoHelpersService) { }

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


  onImprimirMovimientoA4Pdf(movimiento: MovimientoListaDTO) {
    return this._movimientosService.imprimirMovimientoA4Pdf(movimiento._id)
      .subscribe({
        next: (respuesta: Blob) => {
          JasperService.mostrarPdf(respuesta);
        },
        error: (error) => {
          console.error('Error al imprimir Movimiento A4: ', error);
          this.onError('Error al imprimir Movimiento A4');
        },
        complete: () => {
          // Lógica a ejecutar cuando la operación está completa
        }
      });
  }

  onCambiarPage(event: PageEvent) {
    if (this.listMovimientosListaDTO.length > 0) {
      this.pageRequest.pagina = event.pageIndex; //Asignamos el numero de pagina
      this.pageRequest.tamanho = event.pageSize;  //Asignamos el tamaño de las pagina

      this._movimientosComponent.refrescar(this.pageRequest);
    }
  }

  private onError(error: string) {
    this._avisoHelpersService.mostrarMensaje(error, '', 4000);
  }

  public formatearValorMoneda(valor: number, moneda: any): string {
    return MonedaHelpersService.formatearValorMoneda(valor, moneda);
  }

}
