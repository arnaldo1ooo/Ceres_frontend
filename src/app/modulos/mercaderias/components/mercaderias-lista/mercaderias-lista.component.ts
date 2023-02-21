import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(
    private ruta: Router,
    private rutaActual: ActivatedRoute) { }

  ngOnInit(): void {
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

}
