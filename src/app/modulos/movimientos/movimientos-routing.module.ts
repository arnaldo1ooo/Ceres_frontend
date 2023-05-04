import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  TiposMovimientoSeleccionComponent,
} from '../tipos-movimiento/componentes/tipos-movimiento-seleccion/tipos-movimiento-seleccion.component';
import { MovimientosComponent } from './containers/movimientos/movimientos.component';

const routes: Routes = [
  { path: '', component: MovimientosComponent },
  { path: 'tipos-movimiento', component: TiposMovimientoSeleccionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
