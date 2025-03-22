import { MercaderiaResolver } from './guards/mercaderia.resolver';
import { MercaderiaFormComponent } from './containers/mercaderia-form/mercaderia-form.component';
import { MercaderiasComponent } from './containers/mercaderias/mercaderias.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModoEdicion } from 'src/app/compartido/enums/modoEdicion.enum';
import { NUEVO } from 'src/app/compartido/constantes/constantes';

const routes: Routes = [
  { path: '', component: MercaderiasComponent },
  {
    path: NUEVO, component: MercaderiaFormComponent,
    resolve: { mercaderia: MercaderiaResolver },
    data: { modoEdicion: ModoEdicion.MODO_NUEVO }
  },
  {
    path: 'visualizar/:id', component: MercaderiaFormComponent,
    resolve: { mercaderia: MercaderiaResolver },
    data: { modoEdicion: ModoEdicion.MODO_VISUALIZAR }
  },
  { path: 'editar/:id', component: MercaderiaFormComponent,
    resolve: { mercaderia: MercaderiaResolver },
    data: { modoEdicion: ModoEdicion.MODO_EDITAR }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercaderiasRoutingModule { }
