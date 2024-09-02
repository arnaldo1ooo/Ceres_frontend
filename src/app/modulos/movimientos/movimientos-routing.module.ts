import { ModoEdicion } from '../../compartido/enums/modoEdicion.enum';
import { MovimientoFormComponent } from './containers/movimiento-form/movimiento-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovimientosComponent } from './containers/movimientos/movimientos.component';
import { MovimientoDetalleResolver } from './guards/movimientoDetalle.resolver';

const routes: Routes = [
  { path: '', component: MovimientosComponent },
  {
    path: 'nuevo', component: MovimientoFormComponent,
    resolve: { movimiento: MovimientoDetalleResolver },
    data: { modoEdicion: ModoEdicion.MODO_NUEVO }
  },
  {
    path: 'editar/:id', component: MovimientoFormComponent,
    resolve: { movimiento: MovimientoDetalleResolver },
    data: { modoEdicion: ModoEdicion.MODO_EDITAR }
  },
  {
    path: 'visualizar/:id', component: MovimientoFormComponent,
    resolve: { movimiento: MovimientoDetalleResolver },
    data: { modoEdicion: ModoEdicion.MODO_VISUALIZAR }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
