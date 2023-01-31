import { FilialResolver } from './guards/filial.resolver';
import { FilialFormComponent } from './containers/filial-form/filial-form.component';
import { FilialesComponent } from './containers/filiales/filiales.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FilialesComponent }, //filiales
  { path: 'nuevo', component: FilialFormComponent, resolve: { filial: FilialResolver } }, //Seria filiales/nuevo
  { path: 'visualizar/:id', component: FilialFormComponent, resolve: { filial: FilialResolver } },
  { path: 'editar/:id', component: FilialFormComponent, resolve: { filial: FilialResolver } } //Seria filiales/editar/id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilialesRoutingModule { }
