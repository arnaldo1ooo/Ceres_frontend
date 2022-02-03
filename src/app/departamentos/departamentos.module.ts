import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../compartido/compartidoMaterial/app-material.module';
import { CompartidoModule } from './../compartido/compartido.module';
import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './departamentos/departamentos.component';




@NgModule({
  declarations: [
    DepartamentosComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    AppMaterialModule,
    CompartidoModule
  ]
})
export class DepartamentosModule { }
