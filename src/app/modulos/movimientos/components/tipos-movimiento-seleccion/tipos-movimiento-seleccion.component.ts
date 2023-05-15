import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TipoMovimiento } from 'src/app/modulos/tipos-movimiento/enums/tipo-movimiento.enum';

@Component({
  selector: 'app-tipos-movimiento-seleccion',
  templateUrl: './tipos-movimiento-seleccion.component.html',
  styleUrls: ['./tipos-movimiento-seleccion.component.scss']
})
export class TiposMovimientoSeleccionComponent implements OnInit {

  @Output() eventTipoMovSeleccionado = new EventEmitter<any>(); //Envia el tipo seleccionado al componente padre o principal

  constructor() {

  }

  ngOnInit(): void {

  }

  generarNuevoMovimiento(tipoMovimiento: string) {
    switch (tipoMovimiento) {
      case TipoMovimiento.COMPRA_NORMAL:
        this.eventTipoMovSeleccionado.emit(TipoMovimiento.COMPRA_NORMAL);
        break;
      case TipoMovimiento.VENTA_NORMAL:
        this.eventTipoMovSeleccionado.emit(TipoMovimiento.VENTA_NORMAL);
        break;
      default:
        console.log('Tipo de movimiento desconocido');
        break;
    }
  }


}
