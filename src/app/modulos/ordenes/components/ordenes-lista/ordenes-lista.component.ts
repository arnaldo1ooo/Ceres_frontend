import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { EstadoOrden } from '../../enums/estadoOrden.enum';
import { DEFAULT_PAGE_TAMANHOS } from 'src/app/compartido/constantes/constantes';
import { ApiPageRequest } from 'src/app/compartido/interfaces/api-page-request';
import { ApiPageResponse } from 'src/app/compartido/interfaces/api-page-response';
import { OrdenListaDTO } from '../../model/dtos/ordenListaDTO';

@Component({
  selector: 'app-ordenes-lista',
  templateUrl: './ordenes-lista.component.html',
  styleUrl: './ordenes-lista.component.scss'
})
export class OrdenesListaComponent implements OnInit {
  loading = true;
  ordenesListaDTO: OrdenListaDTO[] = [];
  ordenesFiltradas: OrdenListaDTO[] = [];
  paginaActual = 1;
  estadoSeleccionado = 0;
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

  constructor(private ordenesService: OrdenesService) { }

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.ordenesService.listarTodosOrdenes().subscribe({
      next: (ordenes: OrdenListaDTO[]) => {
        this.ordenesListaDTO = ordenes;
        this.filtrarOrdenes();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener órdenes:', error);
      }
    });
  }

  filtrarOrdenes() {
    if (this.estadoSeleccionado === 0) {
      this.ordenesFiltradas = [...this.ordenesListaDTO]; // "TODOS"
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
    // Si tuvieras un endpoint para borrar, podrías llamarlo aquí
    console.log('Imprimir ticket orden', orden);
  }

  cambiarPagina(event: any) {
    this.paginaActual = event.pageIndex + 1;
  }

}
