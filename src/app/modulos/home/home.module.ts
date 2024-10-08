import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';

import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from './home-routing.module';





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
