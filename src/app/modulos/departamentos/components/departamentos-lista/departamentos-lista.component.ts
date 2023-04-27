import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { Departamento } from '../../model/departamento';
import { DepartamentoListaDTO } from '../../model/dtos/departamentoListaDTO';

@Component({
  selector: 'app-departamentos-lista',
  templateUrl: './departamentos-lista.component.html',
  styleUrls: ['./departamentos-lista.component.scss']
})
export class DepartamentosListaComponent implements OnInit {

  @Input() listDepartamentoListaDTOs: DepartamentoListaDTO[] = [];
  @Output() nuevo = new EventEmitter(false);
  @Output() visualizar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() eliminar = new EventEmitter(false);
  @Output() inactivar = new EventEmitter(false);

  readonly columnasAMostrar = ['_id', 'nombre', 'sucursal', 'situacion', 'acciones'];

  pageRegistrosSeparados  = this.listDepartamentoListaDTOs;
  pageTamanho = 10;
  pageTamanhos = [10, 20, 50];

  constructor(
    private ruta: Router,
    private rutaActual: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageRegistrosSeparados = this.listDepartamentoListaDTOs.slice(0, this.pageTamanho);  //Se separa los primeros X registros para la 1ra pagina
  }

  onNuevo() {
    this.nuevo.emit(true);
  }

  onVisualizar(departamentoListaDTO: DepartamentoListaDTO) {
    this.visualizar.emit(departamentoListaDTO);
  }

  onEditar(departamento: Departamento) {
    this.editar.emit(departamento);
  }

  onEliminar(departamento: Departamento) {
    this.eliminar.emit(departamento);
  }

  onInactivar(departamento: Departamento) {
    this.inactivar.emit(departamento);
  }

  onCambiarPage(event: PageEvent) {
    let totalRegistros = this.listDepartamentoListaDTOs;
    const inicioIndex = event.pageIndex * event.pageSize;
    let finIndex = inicioIndex + event.pageSize;

    if(finIndex > totalRegistros.length) {
      finIndex = totalRegistros.length;
    }

    this.pageRegistrosSeparados = totalRegistros.slice(inicioIndex, finIndex);
  }

}
