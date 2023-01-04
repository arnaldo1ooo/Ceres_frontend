import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() editar = new EventEmitter(false);
  @Output() eliminar = new EventEmitter(false);

  readonly columnasAMostrar = ['_id', 'nombre', 'sucursal', 'situacion', 'acciones'];

  constructor(
    private ruta: Router,
    private rutaActual: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onNuevo() {
    this.nuevo.emit(true);
  }

  onEditar(filial: Filial) {
    this.editar.emit(filial);
  }

  onEliminar(filial: Filial) {
    this.eliminar.emit(filial);
  }


}
