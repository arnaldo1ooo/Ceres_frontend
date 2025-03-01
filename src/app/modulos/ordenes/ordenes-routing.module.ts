import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModoEdicion } from "src/app/compartido/enums/modoEdicion.enum";
import { OrdenesComponent } from "./containers/ordenes/ordenes.component";


const routes: Routes = [
  {
    path: '', component: OrdenesComponent
  },
  /*{
    path: 'nuevo', component: EntidadFormComponent,
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
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesRoutingModule { }
