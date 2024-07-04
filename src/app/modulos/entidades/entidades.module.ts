import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';
import { EntidadesListaComponent } from './components/entidades-lista/entidades-lista.component';

import { EntidadFormComponent } from './containers/entidad-form/entidad-form.component';
import { EntidadesComponent } from './containers/entidades/entidades.component';
import { EntidadesRoutingModule } from './entidades-routing.module';


@NgModule({
  declarations: [
    EntidadesComponent,
    EntidadesListaComponent,
    EntidadFormComponent
  ],
  imports: [
    CommonModule,
    EntidadesRoutingModule,
    MaterialModulosModule,
    CompartidoModule
  ]
})
export class EntidadesModule { }
