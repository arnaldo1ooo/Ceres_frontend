import { DialogoQuillEditorComponent } from './componentes/dialogo-quill-editor/dialogo-quill-editor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { TranslocoRootModule } from '../transloco-root.module';
import {
  DialogoConfirmacionComponent,
} from './componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from './componentes/dialogo-error/dialogo-error.component';
import { MiSidenavComponent } from './componentes/mi-sidenav/mi-sidenav.component';
import { SelectorIdiomaComponent } from './componentes/selector-idioma/selector-idioma.component';
import { MaterialModulosModule } from './material-modulos/material-modulos.module';
import { SituacionPipe } from './pipes/situacion.pipe';
import { SpinnerCargandoModule } from './componentes/spinner-cargando/spinner-cargando.module';
import { FooterPrincipalComponent } from './componentes/footer-principal/footer-principal.component';


@NgModule({
  declarations: [
    DialogoErrorComponent,
    DialogoConfirmacionComponent,
    SituacionPipe,
    MiSidenavComponent,
    SelectorIdiomaComponent,
    DialogoQuillEditorComponent,
    FooterPrincipalComponent
  ],
  imports: [
    CommonModule,
    MaterialModulosModule,
    RouterModule,
    TranslocoRootModule,
    QuillModule
  ],
  exports: [
    DialogoErrorComponent,
    SituacionPipe,
    MiSidenavComponent,
    TranslocoRootModule,
    SelectorIdiomaComponent,
    DialogoQuillEditorComponent,
    SpinnerCargandoModule,
    FooterPrincipalComponent
    //QuillModule
  ]
})
export class CompartidoModule { }