import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogoErrorComponent } from './componentes/dialogo-error/dialogo-error.component';
import { MaterialModulosModule } from './material-modulos/material-modulos.module';
import { CategoriaPipe } from './pipes/categoria.pipe';
import { DialogoConfirmacionComponent } from './componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { SituacionPipe } from './pipes/situacion.pipe';



@NgModule({
  declarations: [
    DialogoErrorComponent,
    CategoriaPipe,
    DialogoConfirmacionComponent,
    SituacionPipe
  ],
  imports: [
    CommonModule,
    MaterialModulosModule
  ],
  exports: [
    DialogoErrorComponent,
    SituacionPipe
  ]
})
export class CompartidoModule { }
