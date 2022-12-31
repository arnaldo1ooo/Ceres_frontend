import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '',  pathMatch: 'full', redirectTo: 'login' },  //Cuando path es vacio, para que redireccione al login
  { path: 'login',  component: LoginComponent },
  { path: 'filiales', loadChildren: () => import('./filiales/filiales.module').then(m => m.FilialesModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
