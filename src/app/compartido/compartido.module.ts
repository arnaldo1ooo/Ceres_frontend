import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogoComponent } from './components/error-dialogo/error-dialogo.component';
import { AppMaterialModule } from './compartidoMaterial/app-material.module';



@NgModule({
  declarations: [
    ErrorDialogoComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [ErrorDialogoComponent]
})
export class CompartidoModule { }
