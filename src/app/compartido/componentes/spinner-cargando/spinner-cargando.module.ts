import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerCargandoComponent } from './spinner-cargando.component';



@NgModule({
  declarations: [SpinnerCargandoComponent],
  imports: [
    CommonModule
  ],
  exports: [SpinnerCargandoComponent]
})
export class SpinnerCargandoModule { }
