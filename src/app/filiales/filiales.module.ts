import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../compartido/materialComponentes/app-material.module';
import { CompartidoModule } from './../compartido/compartido.module';
import { FilialesRoutingModule } from './filiales-routing.module';
import { FilialesComponent } from './filiales/filiales.component';




@NgModule({
  declarations: [
    FilialesComponent
  ],
  imports: [
    CommonModule,
    FilialesRoutingModule,
    AppMaterialModule,
    CompartidoModule
  ]
})
export class FilialesModule { }
