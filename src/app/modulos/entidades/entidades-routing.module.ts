import { EntidadesComponent } from './containers/entidades/entidades.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadFormComponent } from './containers/entidad-form/entidad-form.component';
import { EntidadResolver } from './guards/entidad.resolver';
import { ModoEdicion } from '../../compartido/enums/modoEdicion.enum';
import { NUEVO } from 'src/app/compartido/constantes/constantes';

const routes: Routes = [
  {
    path: '', component: EntidadesComponent
  },
  {
    path: NUEVO, component: EntidadFormComponent,
    resolve: { entidad: EntidadResolver },
    data: { modoEdicion: ModoEdicion.MODO_NUEVO }
  },
  {
    path: 'editar/:id', component: EntidadFormComponent,
    resolve: { entidad: EntidadResolver },
    data: { modoEdicion: ModoEdicion.MODO_EDITAR }
  },
  {
    path: 'visualizar/:id', component: EntidadFormComponent,
    resolve: { entidad: EntidadResolver },
    data: { modoEdicion: ModoEdicion.MODO_VISUALIZAR }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesRoutingModule { }
