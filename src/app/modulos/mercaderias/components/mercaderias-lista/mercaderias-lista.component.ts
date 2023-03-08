import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { Mercaderia } from '../../model/mercaderia';


@Component({
  selector: 'app-mercaderias-lista',
  templateUrl: './mercaderias-lista.component.html',
  styleUrls: ['./mercaderias-lista.component.scss']
})
export class MercaderiasListaComponent implements OnInit {

  @Input() listMercaderias: Mercaderia[] = [];
  @Output() nuevo = new EventEmitter(false);
  @Output() visualizar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() eliminar = new EventEmitter(false);
  @Output() inactivar = new EventEmitter(false);

  readonly columnasAMostrar = ['_id', 'descripcion','tipo', 'sucursal','situacion', 'acciones'];

  public pageRegistrosSeparados  = this.listMercaderias;
  public pageTamanho = 10;
  public pageCantidades = [10, 20, 50];

  constructor(
    private ruta: Router,
    private rutaActual: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageRegistrosSeparados = this.listMercaderias.slice(0, this.pageTamanho);  //Se separa los primeros X registros para la 1ra pagina
  }

  onNuevo() {
    this.nuevo.emit(true);
  }

  onVisualizar(mercaderia: Mercaderia) {
    this.visualizar.emit(mercaderia);
  }

  onEditar(mercaderia: Mercaderia) {
    this.editar.emit(mercaderia);
  }

  onEliminar(mercaderia: Mercaderia) {
    this.eliminar.emit(mercaderia);
  }

  onInactivar(mercaderia: Mercaderia) {
    this.inactivar.emit(mercaderia);
  }

  onCambiarPage(event: PageEvent) {
    let totalRegistros = this.listMercaderias;
    const inicioIndex = event.pageIndex * event.pageSize;
    let finIndex = inicioIndex + event.pageSize;

    if(finIndex > totalRegistros.length) {
      finIndex = totalRegistros.length;
    }

    this.pageRegistrosSeparados = totalRegistros.slice(inicioIndex, finIndex);
  }

}
