import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModulosModule } from '../compartido/material-modulos/material-modulos.module';
import { HomeComponent } from './containers/home/home.component';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModulosModule,
    FormsModule //Sive para usar el ngModel en el html,
  ]
})
export class HomeModule { }
