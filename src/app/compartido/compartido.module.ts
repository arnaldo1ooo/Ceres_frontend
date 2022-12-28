import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogoErrorComponent } from './componentes/dialogo-error/dialogo-error.component';
import { MaterialModulosModule } from './material-modulos/material-modulos.module';
import { CategoriaPipe } from './pipes/categoria.pipe';
import { DialogoConfirmacionComponent } from './componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';



@NgModule({
  declarations: [
    DialogoErrorComponent,
    CategoriaPipe,
    DialogoConfirmacionComponent
  ],
  imports: [
    CommonModule,
    MaterialModulosModule
  ],
  exports: [
    DialogoErrorComponent,
    CategoriaPipe
  ]
})
export class CompartidoModule { }
