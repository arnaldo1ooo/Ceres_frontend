import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModulosModule } from '../compartido/material-modulos/material-modulos.module';
import { HomeComponent } from './containers/home/home.component';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModulosModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
