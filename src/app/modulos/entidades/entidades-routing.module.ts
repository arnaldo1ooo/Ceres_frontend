import { EntidadesComponent } from './containers/entidades/entidades.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadFormComponent } from './containers/entidad-form/entidad-form.component';
import { EntidadResolver } from './guards/entidad.resolver';

const routes: Routes = [
  { path: '', component: EntidadesComponent }, //Entidades
  { path: 'nuevo', component: EntidadFormComponent, resolve: { departamento: EntidadResolver } }, //Seria entidades/nuevo
  { path: 'visualizar/:id', component: EntidadFormComponent, resolve: { departamento: EntidadResolver } },
  { path: 'editar/:id', component: EntidadFormComponent, resolve: { departamento: EntidadResolver } } //Seria entidades/editar/id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesRoutingModule { }
