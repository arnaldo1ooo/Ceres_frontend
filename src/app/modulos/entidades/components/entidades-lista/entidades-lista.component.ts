import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadListaDTO } from '../../models/dtos/entidadListaDTO';
import { Entidad } from '../../models/entidad';

@Component({
  selector: 'app-entidades-lista',
  templateUrl: './entidades-lista.component.html',
  styleUrls: ['./entidades-lista.component.scss']
})
export class EntidadesListaComponent implements OnInit {

  @Input() listEntidadListaDTOs: EntidadListaDTO[] = [];
  @Output() nuevo = new EventEmitter(false);
  @Output() visualizar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() eliminar = new EventEmitter(false);
  @Output() inactivar = new EventEmitter(false);

  readonly columnasAMostrar = ['_id', 'nombreApellido', 'sucursal', 'situacion', 'acciones'];

  pageRegistrosSeparados  = this.listEntidadListaDTOs;
  pageTamanho = 10;
  pageTamanhos = [10, 20, 50];

  constructor(
    private ruta: Router,
    private rutaActual: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageRegistrosSeparados = this.listEntidadListaDTOs.slice(0, this.pageTamanho);  //Se separa los primeros X registros para la 1ra pagina
  }

  onNuevo() {
    this.nuevo.emit(true);
  }

  onVisualizar(entidadListaDTO: EntidadListaDTO) {
    this.visualizar.emit(entidadListaDTO);
  }

  onEditar(entidad: Entidad) {
    this.editar.emit(entidad);
  }

  onEliminar(entidad: Entidad) {
    this.eliminar.emit(entidad);
  }

  onInactivar(entidad: Entidad) {
    this.inactivar.emit(entidad
      );
  }

  onCambiarPage(event: PageEvent) {
    let totalRegistros = this.listEntidadListaDTOs;
    const inicioIndex = event.pageIndex * event.pageSize;
    let finIndex = inicioIndex + event.pageSize;

    if(finIndex > totalRegistros.length) {
      finIndex = totalRegistros.length;
    }

    this.pageRegistrosSeparados = totalRegistros.slice(inicioIndex, finIndex);
  }

}
