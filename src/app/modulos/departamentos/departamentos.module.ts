import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';

import { DepartamentosListaComponent } from './components/departamentos-lista/departamentos-lista.component';
import { DepartamentoFormComponent } from './containers/departamento-form/departamento-form.component';
import { DepartamentosComponent } from './containers/departamentos/departamentos.component';
import { DepartamentosRoutingModule } from './departamentos-routing.module';


@NgModule({
  declarations: [
    DepartamentosComponent,
    DepartamentosListaComponent,
    DepartamentoFormComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    MaterialModulosModule,
    CompartidoModule
  ]
})
export class DepartamentosModule { }
