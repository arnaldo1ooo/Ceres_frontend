import { DepartamentoResolver } from './guards/departamento.resolver';
import { DepartamentoFormComponent } from './containers/departamento-form/departamento-form.component';
import { DepartamentosComponent } from './containers/departamentos/departamentos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NUEVO } from 'src/app/compartido/constantes/constantes';

const routes: Routes = [
  { path: '', component: DepartamentosComponent }, //Departamentos
  { path: NUEVO, component: DepartamentoFormComponent, resolve: { departamento: DepartamentoResolver } }, //Seria departamentos/nuevo
  { path: 'visualizar/:id', component: DepartamentoFormComponent, resolve: { departamento: DepartamentoResolver } },
  { path: 'editar/:id', component: DepartamentoFormComponent, resolve: { departamento: DepartamentoResolver } } //Seria departamentos/editar/id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
