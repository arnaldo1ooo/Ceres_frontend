import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompartidoModule } from './../compartido/compartido.module';
import { MaterialModulosModule } from './../compartido/material-modulos/material-modulos.module';
import { FilialesListaComponent } from './components/filiales-lista/filiales-lista.component';
import { FilialFormComponent } from './containers/filial-form/filial-form.component';
import { FilialesComponent } from './containers/filiales/filiales.component';
import { FilialesRoutingModule } from './filiales-routing.module';


@NgModule({
  declarations: [
    FilialesComponent,
    FilialesListaComponent,
    FilialFormComponent
  ],
  imports: [
    CommonModule,
    FilialesRoutingModule,
    MaterialModulosModule
  ]
})
export class FilialesModule { }
