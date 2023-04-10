import { DepartamentoResolver } from './guards/departamento.resolver';
import { DepartamentoFormComponent } from './containers/departamento-form/departamento-form.component';
import { DepartamentosComponent } from './containers/departamentos/departamentos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DepartamentosComponent }, //Departamentos
  { path: 'nuevo', component: DepartamentoFormComponent, resolve: { departamento: DepartamentoResolver } }, //Seria departamentos/nuevo
  { path: 'visualizar/:id', component: DepartamentoFormComponent, resolve: { departamento: DepartamentoResolver } },
  { path: 'editar/:id', component: DepartamentoFormComponent, resolve: { departamento: DepartamentoResolver } } //Seria departamentos/editar/id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
