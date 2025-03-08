import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { EstadoOrden, EstadoOrdenUtils } from '../../enums/estado-orden.enum';
import { DEFAULT_PAGE_TAMANHOS } from 'src/app/compartido/constantes/constantes';
import { ApiPageRequest } from 'src/app/compartido/interfaces/api-page-request';
import { ApiPageResponse } from 'src/app/compartido/interfaces/api-page-response';
import { OrdenListaDTO } from '../../model/dtos/ordenListaDTO';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { AvisoHelpersService } from 'src/app/compartido/services/aviso-helpers.service';

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
  ordenesPorEstado: { [key: string]: OrdenListaDTO[] } = {};

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
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.ordenesService.listarTodosOrdenes().subscribe({
      next: (ordenes: OrdenListaDTO[]) => {
        this.ordenesListaDTO = ordenes;

        // Ordenar por id de mayor a menor
        this.ordenesListaDTO.sort((a, b) => {
          const idA = a._id ?? 0;
          const idB = b._id ?? 0;

          return idB - idA;
        });

        // Inicializa el objeto para cada estado
        this.estadosOrden.forEach(estado => {
          this.ordenesPorEstado[estado.valor] = [];
        });

        // Agrupa las órdenes según su estado
        this.ordenesListaDTO.forEach(orden => {
          if (this.ordenesPorEstado[orden.estado]) {
            this.ordenesPorEstado[orden.estado].push(orden);
          }
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
    // Aquí podrías abrir un diálogo o navegar a un formulario de creación
    console.log('Agregar nueva orden');
  }

  onVisualizar(orden: OrdenListaDTO): void {
    // Aquí podrías abrir un diálogo o navegar a un formulario de edición
    console.log('Visualizar orden', orden);
  }

  onEditar(orden: OrdenListaDTO): void {
    // Aquí podrías abrir un diálogo o navegar a un formulario de edición
    console.log('Editar orden', orden);
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
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      // Transferimos la orden de una columna a otra y actualizamos su estado
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let ordenMovida: OrdenListaDTO = event.container.data[event.currentIndex];
      ordenMovida.estado = EstadoOrdenUtils.getEstadoOrdenPorKey(estadoDestino);

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
  }

}
