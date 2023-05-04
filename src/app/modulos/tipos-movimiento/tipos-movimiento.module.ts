import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';

import {
  TiposMovimientoSeleccionComponent,
} from './componentes/tipos-movimiento-seleccion/tipos-movimiento-seleccion.component';



@NgModule({
  declarations: [
    TiposMovimientoSeleccionComponent
  ],
  imports: [
    CommonModule,
    MaterialModulosModule,
    CompartidoModule
  ]
})
export class TiposMovimientoModule { }
