import { Component, OnInit } from '@angular/core';
import { TipoMovimiento } from 'src/app/modulos/tipos-movimiento/enums/tipo-movimiento.enum';

@Component({
  selector: 'app-tipos-movimiento-seleccion',
  templateUrl: './tipos-movimiento-seleccion.component.html',
  styleUrls: ['./tipos-movimiento-seleccion.component.scss']
})
export class TiposMovimientoSeleccionComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }

  generarNuevoMovimiento(tipoMovimiento: string) {
    switch (tipoMovimiento) {
      case TipoMovimiento.COMPRA_NORMAL:
        console.log('compra-normal');
        break;
      case TipoMovimiento.VENTA_NORMAL:
        console.log('venta-normal');
        break;
      default:
        console.log('Tipo de movimiento desconocido');
        break;
    }
  }


}
