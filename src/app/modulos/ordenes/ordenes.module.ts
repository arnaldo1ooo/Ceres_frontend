import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenesRoutingModule } from './ordenes-routing.module';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { OrdenesListaComponent } from './components/ordenes-lista/ordenes-lista.component';
import { OrdenesFormComponent } from './containers/ordenes-form/ordenes-form.component';
import { OrdenesComponent } from './containers/ordenes/ordenes.component';
import { EstadoOrdenPipe } from "./pipes/estado-orden.pipe";
import { DialogAdicionalesComponent } from './components/dialog-adicionales/dialog-adicionales.component';



@NgModule({
  declarations: [
    OrdenesListaComponent,
    OrdenesComponent,
    OrdenesFormComponent,
    DialogAdicionalesComponent
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
