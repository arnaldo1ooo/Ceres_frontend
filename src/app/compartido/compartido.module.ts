import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslocoRootModule } from '../transloco-root.module';
import {
  DialogoConfirmacionComponent,
} from './componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from './componentes/dialogo-error/dialogo-error.component';
import { MiSidenavComponent } from './componentes/mi-sidenav/mi-sidenav.component';
import { SelectorIdiomaComponent } from './componentes/selector-idioma/selector-idioma.component';
import { MaterialModulosModule } from './material-modulos/material-modulos.module';
import { SituacionPipe } from './pipes/situacion.pipe';


@NgModule({
  declarations: [
    DialogoErrorComponent,
    DialogoConfirmacionComponent,
    SituacionPipe,
    MiSidenavComponent,
    SelectorIdiomaComponent
  ],
  imports: [
    CommonModule,
    MaterialModulosModule,
    RouterModule,
    TranslocoRootModule
  ],
  exports: [
    DialogoErrorComponent,
    SituacionPipe,
    MiSidenavComponent,
    TranslocoRootModule,
    SelectorIdiomaComponent
  ]
})
export class CompartidoModule { }
