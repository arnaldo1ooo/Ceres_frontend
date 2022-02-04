import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogoComponent } from './components/error-dialogo/error-dialogo.component';
import { AppMaterialModule } from './materialComponentes/app-material.module';
import { SituacionPipe } from './pipes/situacionIcon.pipe';



@NgModule({
  declarations: [
    ErrorDialogoComponent,
    SituacionPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogoComponent,
    SituacionPipe
  ]
})
export class CompartidoModule { }
