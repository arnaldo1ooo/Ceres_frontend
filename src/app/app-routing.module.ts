import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', pathMatch:'full', redirectTo: 'login'},
  { path: 'departamentos', loadChildren: () => import('./departamentos/departamentos.module').then(m => m.DepartamentosModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
