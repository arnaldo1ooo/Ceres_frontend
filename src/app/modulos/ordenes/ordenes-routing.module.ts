import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModoEdicion } from "src/app/compartido/enums/modoEdicion.enum";
import { OrdenesComponent } from "./containers/ordenes/ordenes.component";
import { OrdenesFormComponent } from "./containers/ordenes-form/ordenes-form.component";
import { OrdenResolver } from "./guards/orden.resolver";
import { NUEVO } from "src/app/compartido/constantes/constantes";


const routes: Routes = [
  {
    path: '', component: OrdenesComponent
  },
  {
    path: NUEVO, component: OrdenesFormComponent,
    resolve: { orden: OrdenResolver },
    data: { modoEdicion: ModoEdicion.MODO_NUEVO }
  },
  {
    path: 'editar/:id', component: OrdenesFormComponent,
    resolve: { entidad: OrdenResolver },
    data: { modoEdicion: ModoEdicion.MODO_EDITAR }
  },
  {
    path: 'visualizar/:id', component: OrdenesFormComponent,
    resolve: { entidad: OrdenResolver },
    data: { modoEdicion: ModoEdicion.MODO_VISUALIZAR }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesRoutingModule { }
