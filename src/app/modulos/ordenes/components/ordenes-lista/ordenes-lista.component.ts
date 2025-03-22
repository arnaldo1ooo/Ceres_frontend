import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { EstadoOrden, EstadoOrdenUtils } from '../../enums/estado-orden.enum';
import { DEFAULT_PAGE_TAMANHOS, EDITAR, NUEVO, VISUALIZAR } from 'src/app/compartido/constantes/constantes';
import { ApiPageRequest } from 'src/app/compartido/interfaces/api-page-request';
import { ApiPageResponse } from 'src/app/compartido/interfaces/api-page-response';
import { OrdenListaDTO } from '../../model/dtos/ordenListaDTO';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { AvisoHelpersService } from 'src/app/compartido/services/aviso-helpers.service';
import { DialogoIngresarTextoComponent } from 'src/app/compartido/componentes/dialogo-ingresar-texto/dialogo-ingresar-texto.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ordenes-lista',
  templateUrl: './ordenes-lista.component.html',
  styleUrl: './ordenes-lista.component.scss'
})
export class OrdenesListaComponent implements OnInit {
  ID_TODOS = 0;
  loading = true;
  ordenesListaDTO: OrdenListaDTO[] = [];
  ordenesFiltradas: OrdenListaDTO[] = [];
  paginaActual = 1;
  estadoSeleccionado = 0;
  arrayOrdenesPorEstado: { [key: string]: OrdenListaDTO[] } = {};

  protected tamanhosPage = DEFAULT_PAGE_TAMANHOS;
  protected apiPageResponse!: ApiPageResponse;
  protected apiPageRequest!: ApiPageRequest;


  estadosOrden = [
    { label: 'Pendiente', valor: EstadoOrden.PENDIENTE },
    { label: 'En preparación', valor: EstadoOrden.EN_PREPARACION },
    { label: 'Listo', valor: EstadoOrden.LISTO },
    { label: 'En entrega', valor: EstadoOrden.EN_ENTREGA },
    { label: 'Entregado', valor: EstadoOrden.ENTREGADO },
    { label: 'Cancelado', valor: EstadoOrden.CANCELADO }
  ];

  constructor(private ordenesService: OrdenesService,
    private _avisoHelpersService: AvisoHelpersService,
    private _dialogo: MatDialog,
    private _ruta: Router,
    private _rutaActual: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.ordenesService.listarTodosOrdenes().subscribe({
      next: (ordenes: OrdenListaDTO[]) => {
        this.ordenesListaDTO = ordenes;

        this.estadosOrden.forEach(estado => {
          this.arrayOrdenesPorEstado[estado.valor] = [];
        });

        // Agrupa las órdenes según su estado
        this.ordenesListaDTO.forEach(orden => {
          if (this.arrayOrdenesPorEstado[orden.estado]) {
            this.arrayOrdenesPorEstado[orden.estado].push(orden);
          }
        });

        // Ordenar cada grupo de órdenes por fecha de emisión (de mayor a menor)
        Object.keys(this.arrayOrdenesPorEstado).forEach(estado => {
          this.arrayOrdenesPorEstado[estado].sort((a, b) =>
            new Date(b.fechaEmision).getTime() - new Date(a.fechaEmision).getTime()
          );
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener órdenes:', error);
      }
    });
  }



  filtrarOrdenes() {
    if (this.estadoSeleccionado === this.ID_TODOS) {
      this.ordenesFiltradas = [...this.ordenesListaDTO];
    } else {
      const estado = this.estadosOrden[this.estadoSeleccionado - 1].valor;
      this.ordenesFiltradas = this.ordenesListaDTO.filter(o => o.estado === estado);
    }
  }

  onNuevo(): void {
    this._ruta.navigate([NUEVO], { relativeTo: this._rutaActual });
  }

  onVisualizar(orden: OrdenListaDTO): void {
    this._ruta.navigate([VISUALIZAR, orden._id], { relativeTo: this._rutaActual });
  }

  onEditar(orden: OrdenListaDTO): void {
    this._ruta.navigate([EDITAR, orden._id], { relativeTo: this._rutaActual });
  }

  onCancelarOrden(orden: OrdenListaDTO): void {
    // Si tuvieras un endpoint para borrar, podrías llamarlo aquí
    console.log('Cancelar orden', orden);
  }

  onImprimirTicketOrden(orden: OrdenListaDTO): void {
    console.log('Imprimir ticket orden', orden);
  }

  cambiarPagina(event: any) {
    this.paginaActual = event.pageIndex + 1;
  }

  getEstadoOrden(estado: string): string {
    switch (estado.toUpperCase()) {
      case EstadoOrden.PENDIENTE: return 'estado-color-pendiente';
      case EstadoOrden.EN_PREPARACION: return 'estado-color-en-preparacion';
      case EstadoOrden.LISTO: return 'estado-color-listo';
      case EstadoOrden.EN_ENTREGA: return 'estado-color-en-entrega';
      case EstadoOrden.ENTREGADO: return 'estado-color-entregado';
      case EstadoOrden.CANCELADO: return 'estado-color-cancelado';
      default: return 'estado-color-default';
    }
  }

  protected tabOnChange(tabChangeEvent: MatTabChangeEvent): void {
    this.estadoSeleccionado = tabChangeEvent.index;
    this.filtrarOrdenes();
  }


  onDropOrden(event: CdkDragDrop<OrdenListaDTO[]>, estadoDestino: string) {

    if (event.previousContainer === event.container) {
      // Reordenamos dentro de la misma columna
      this.dropItemEnMismaColumna(event);
    }
    else {
      // Transferimos la orden de una columna a otra y actualizamos su estado
      this.dropItemEntreColumnas(event);

      const estadoOrdenDestino: EstadoOrden = EstadoOrdenUtils.getEstadoOrdenPorKey(estadoDestino);
      let ordenMovida: OrdenListaDTO = event.container.data[event.currentIndex];


      if (ordenMovida.estado === EstadoOrden.CANCELADO) {
        this._avisoHelpersService.mostrarMensaje("Una orden Cancelada no puede cambiar de estado!");
        this.revertirDrop(event);
        return;
      }

      if (estadoOrdenDestino === EstadoOrden.CANCELADO) {
        this.abrirDialogoMotivoCancelacion(ordenMovida).subscribe(motivoCanIngresado => {
          if (motivoCanIngresado) {
            ordenMovida.motivoCancelacion = motivoCanIngresado;
            this.actualizarEstadoDeOrden(ordenMovida, estadoOrdenDestino);
          }
          else {
            this.revertirDrop(event);
          }
        });
      }
      else {
        this.actualizarEstadoDeOrden(ordenMovida, estadoOrdenDestino);
      }
    }
  }

  private dropItemEnMismaColumna<T>(event: CdkDragDrop<T[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  private dropItemEntreColumnas<T>(event: CdkDragDrop<T[]>): void { //Mover el item entre columnas
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  private revertirDrop<T>(event: CdkDragDrop<T[]>): void { //Revertir y volver el item a su columna original
    transferArrayItem(
      event.container.data,
      event.previousContainer.data,
      event.currentIndex,
      event.previousIndex
    );
  }

  private actualizarEstadoDeOrden(ordenMovida: OrdenListaDTO, estadoOrdenDestino: EstadoOrden) {
    ordenMovida.estado = estadoOrdenDestino;

    this.ordenesService.actualizarParcialOrden(ordenMovida._id!, ordenMovida).subscribe({
      next: (response) => {
        console.log("Éxito al actualizar estado de orden:", response);
      },
      error: (error) => {
        this.cargarOrdenes();
        this._avisoHelpersService.mostrarMensajeError("Error: ", error);
      }
    });
  }

  abrirDialogoMotivoCancelacion(ordenListaDTO: OrdenListaDTO): Observable<string> {
    const dialogRef = this._dialogo.open(DialogoIngresarTextoComponent, {
      data: {
        titulo: 'Informe el motivo de la cancelación',
        textoInicial: ordenListaDTO.motivoCancelacion,
        isModoLectura: false
      }
    });

    return dialogRef.afterClosed();
  }

}
