import { MercaderiaResolver } from './guards/mercaderia.resolver';
import { MercaderiaFormComponent } from './containers/mercaderia-form/mercaderia-form.component';
import { MercaderiasComponent } from './containers/mercaderias/mercaderias.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MercaderiasComponent },
  { path: 'nuevo', component: MercaderiaFormComponent, resolve: { mercaderia: MercaderiaResolver } },
  { path: 'visualizar/:id', component: MercaderiaFormComponent, resolve: { mercaderia: MercaderiaResolver } },
  { path: 'editar/:id', component: MercaderiaFormComponent, resolve: { mercaderia: MercaderiaResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercaderiasRoutingModule { }
