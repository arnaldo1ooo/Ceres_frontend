import { ModoEdicion } from '../../compartido/enums/modo-edicion.enum';
import { MovimientoFormComponent } from './containers/movimiento-form/movimiento-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovimientosComponent } from './containers/movimientos/movimientos.component';
import { MovimientoDetalleResolver } from './guards/movimientoDetalle.resolver';
import { NUEVO } from 'src/app/compartido/constantes/constantes';

const routes: Routes = [
  { path: '', component: MovimientosComponent },
  {
    path: NUEVO, component: MovimientoFormComponent,
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
