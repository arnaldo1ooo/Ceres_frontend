import { AppMaterialModule } from '../materialModulos/app-material/app-material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './departamentos/departamentos.component';


@NgModule({
  declarations: [
    DepartamentosComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    AppMaterialModule
  ]
})
export class DepartamentosModule { }
