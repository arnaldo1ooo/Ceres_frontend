import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';

import { MovimientosListaComponent } from './components/movimientos-lista/movimientos-lista.component';
import {
  TiposMovimientoSeleccionComponent,
} from './components/tipos-movimiento-seleccion/tipos-movimiento-seleccion.component';
import { MovimientoFormComponent } from './containers/movimiento-form/movimiento-form.component';
import { MovimientosComponent } from './containers/movimientos/movimientos.component';
import { MovimientosRoutingModule } from './movimientos-routing.module';


@NgModule({
  declarations: [
    MovimientosComponent,
    MovimientosListaComponent,
    MovimientoFormComponent,
    TiposMovimientoSeleccionComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    MaterialModulosModule,
    CompartidoModule
  ]
})
export class MovimientosModule { }
