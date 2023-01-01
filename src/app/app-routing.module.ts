import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/containers/login-form/login-form/login-form.component';



const routes: Routes = [

  { path: '',  pathMatch: 'full', redirectTo: 'login' },  //Cuando path es vacio, para que redireccione al login
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'filiales', loadChildren: () => import('./filiales/filiales.module').then(m => m.FilialesModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
