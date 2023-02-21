import { TipoMercaderiaPipe } from './pipes/tipoMercaderia.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { MaterialModulosModule } from 'src/app/compartido/material-modulos/material-modulos.module';

import { MercaderiasListaComponent } from './components/mercaderias-lista/mercaderias-lista.component';
import { MercaderiaFormComponent } from './containers/mercaderia-form/mercaderia-form.component';
import { MercaderiasComponent } from './containers/mercaderias/mercaderias.component';
import { MercaderiasRoutingModule } from './mercaderias-routing.module';


@NgModule({
  declarations: [
    MercaderiasComponent,
    MercaderiasListaComponent,
    MercaderiaFormComponent,
    TipoMercaderiaPipe
  ],
  imports: [
    CommonModule,
    MercaderiasRoutingModule,
    MaterialModulosModule,
    CompartidoModule
  ]
})
export class MercaderiasModule { }
