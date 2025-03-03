import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesRoutingModule } from './ordenes-routing.module';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { OrdenesListaComponent } from './components/ordenes-lista/ordenes-lista.component';
import { OrdenesComponent } from './containers/ordenes/ordenes.component';
import { EstadoOrdenPipe } from "./pipes/estado-orden.pipe";



@NgModule({
  declarations: [
    OrdenesListaComponent,
    OrdenesComponent
  ],
  imports: [
    CommonModule,
    OrdenesRoutingModule,
    MaterialModulosModule,
    CompartidoModule,
    EstadoOrdenPipe
]
})
export class OrdenesModule { }
