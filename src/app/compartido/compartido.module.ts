import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  DialogoConfirmacionComponent,
} from './componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from './componentes/dialogo-error/dialogo-error.component';
import { MiSidenavComponent } from './componentes/mi-sidenav/mi-sidenav.component';
import { MaterialModulosModule } from './material-modulos/material-modulos.module';
import { SituacionPipe } from './pipes/situacion.pipe';


@NgModule({
  declarations: [
    DialogoErrorComponent,
    DialogoConfirmacionComponent,
    SituacionPipe,
    MiSidenavComponent,

  ],
  imports: [
    CommonModule,
    MaterialModulosModule,
    RouterModule
  ],
  exports: [
    DialogoErrorComponent,
    SituacionPipe,
    MiSidenavComponent
  ]
})
export class CompartidoModule { }
