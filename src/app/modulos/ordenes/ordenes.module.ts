import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesRoutingModule } from './ordenes-routing.module';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { OrdenesComponent } from './containers/ordenes/ordenes.component';
import { OrdenesListaComponent } from './components/ordenes-lista/ordenes-lista.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    OrdenesRoutingModule,
    MaterialModulosModule,
    CompartidoModule
  ]
})
export class OrdenesModule { }
