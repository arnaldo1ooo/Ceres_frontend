import { Component } from '@angular/core';

@Component({
  selector: 'app-tipos-movimiento-seleccion',
  templateUrl: './tipos-movimiento-seleccion.component.html',
  styleUrls: ['./tipos-movimiento-seleccion.component.scss']
})
export class TiposMovimientoSeleccionComponent {


  constructor() {

  }

  ngOnInit(): void {

  }

  generarMovimiento(tipoMovimiento: string) {
    switch (tipoMovimiento) {
      case 'compra-normal':
        console.log('compra-normal');
        break;
      case 'venta-normal':
        console.log('venta-normal');
        break;
      default:
        console.log('Tipo de movimiento desconocido');
        break;
    }
  }


}
