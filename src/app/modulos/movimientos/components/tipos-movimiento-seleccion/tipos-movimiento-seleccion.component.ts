import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TiposMovimientoService } from 'src/app/modulos/tipos-movimiento/services/tipos-movimiento.service';
import { HelpersService } from '../../../../compartido/services/helpers.service';

@Component({
  selector: 'app-tipos-movimiento-seleccion',
  templateUrl: './tipos-movimiento-seleccion.component.html',
  styleUrls: ['./tipos-movimiento-seleccion.component.scss']
})
export class TiposMovimientoSeleccionComponent implements OnInit {

  @Output() eventTipoMovSeleccionado = new EventEmitter<any>(); //Envia el tipo seleccionado al componente padre o principal

  constructor(private _tiposMovimientoService: TiposMovimientoService) {

  }

  ngOnInit(): void {

  }

  generarNuevoMovimiento(idTipoMovimiento: string) {
    HelpersService.salvarItemEnLocalStorage('idTipoMovimiento', idTipoMovimiento);
    this.eventTipoMovSeleccionado.emit();
  }


}
