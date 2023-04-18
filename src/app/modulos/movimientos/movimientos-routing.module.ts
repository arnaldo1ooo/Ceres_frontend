import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientosComponent } from './containers/movimientos/movimientos.component';

const routes: Routes = [
  { path: '', component: MovimientosComponent },
  /*{ path: 'nuevo', component: MovimientoFormComponent, resolve: { mercaderia: MovimientoResolver } },
  { path: 'visualizar/:id', component: MovimientoFormComponent, resolve: { mercaderia: MovimientoResolver } },
  { path: 'editar/:id', component: MovimientoFormComponent, resolve: { mercaderia: MovimientoResolver } }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
