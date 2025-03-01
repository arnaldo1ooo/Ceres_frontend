import { Component, OnInit } from '@angular/core';
import { Orden } from '../../model/orden';
import { OrdenesService } from '../../services/ordenes.service';

@Component({
  selector: 'app-ordenes-lista',
  templateUrl: './ordenes-lista.component.html',
  styleUrl: './ordenes-lista.component.scss'
})
export class OrdenesListaComponent implements OnInit {
  ordenes: Orden[] = [];
  loading = true;

  constructor(private ordenesService: OrdenesService) { }

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.loading = true;
    this.ordenesService.getOrdenes().subscribe({
      next: (data) => {
        this.ordenes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar órdenes:', err);
        this.loading = false;
      }
    });
  }

  agregarOrden(): void {
    // Aquí podrías abrir un diálogo o navegar a un formulario de creación
    console.log('Agregar nueva orden');
  }

  editarOrden(orden: Orden): void {
    // Aquí podrías abrir un diálogo o navegar a un formulario de edición
    console.log('Editar orden', orden);
  }

  eliminarOrden(orden: Orden): void {
    // Si tuvieras un endpoint para borrar, podrías llamarlo aquí
    console.log('Eliminar orden', orden);
  }
}
