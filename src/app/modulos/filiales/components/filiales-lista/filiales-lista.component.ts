import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { Filial } from '../../model/filial';

@Component({
  selector: 'app-filiales-lista',
  templateUrl: './filiales-lista.component.html',
  styleUrls: ['./filiales-lista.component.scss']
})
export class FilialesListaComponent implements OnInit {

  @Input() listFiliales: Filial[] = [];
  @Output() nuevo = new EventEmitter(false);
  @Output() visualizar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() eliminar = new EventEmitter(false);
  @Output() inactivar = new EventEmitter(false);

  readonly columnasAMostrar = ['_id', 'nombre', 'sucursal', 'situacion', 'acciones'];

  pageRegistrosSeparados  = this.listFiliales;
  pageTamanho = 10;
  pageTamanhos = [10, 20, 50];

  constructor(
    private ruta: Router,
    private rutaActual: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageRegistrosSeparados = this.listFiliales.slice(0, this.pageTamanho);  //Se separa los primeros X registros para la 1ra pagina
  }

  onNuevo() {
    this.nuevo.emit(true);
  }

  onVisualizar(filial: Filial) {
    this.visualizar.emit(filial);
  }

  onEditar(filial: Filial) {
    this.editar.emit(filial);
  }

  onEliminar(filial: Filial) {
    this.eliminar.emit(filial);
  }

  onInactivar(filial: Filial) {
    this.inactivar.emit(filial);
  }

  onCambiarPage(event: PageEvent) {
    let totalRegistros = this.listFiliales;
    const inicioIndex = event.pageIndex * event.pageSize;
    let finIndex = inicioIndex + event.pageSize;

    if(finIndex > totalRegistros.length) {
      finIndex = totalRegistros.length;
    }

    this.pageRegistrosSeparados = totalRegistros.slice(inicioIndex, finIndex);
  }

}
