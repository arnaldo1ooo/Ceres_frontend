import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CompartidoModule } from './../compartido/compartido.module';
import { MaterialModulosModule } from './../compartido/material-modulos/material-modulos.module';
import { FilialesListaComponent } from './components/filiales-lista/filiales-lista.component';
import { FilialesComponent } from './containers/filiales/filiales.component';
import { FilialesRoutingModule } from './filiales-routing.module';


@NgModule({
  declarations: [
    FilialesComponent,
    FilialesListaComponent
  ],
  imports: [
    CommonModule,
    FilialesRoutingModule,
    MaterialModulosModule,
    CompartidoModule,
    ReactiveFormsModule
  ]
})
export class FilialesModule { }
