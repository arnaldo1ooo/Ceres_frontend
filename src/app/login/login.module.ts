import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModulosModule } from '../compartido/material-modulos/material-modulos.module';
import { LoginFormComponent } from './containers/login-form/login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModulosModule,
    CompartidoModule
  ]
})
export class LoginModule { }
