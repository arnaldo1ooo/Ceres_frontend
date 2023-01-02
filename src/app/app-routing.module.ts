
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/containers/home/home.component';



const routes: Routes = [

  //{ path: '',  pathMatch: 'full', redirectTo: 'login' },  //Cuando path es vacio, para que redireccione al login
  { path: '', component: HomeComponent },  //Raiz de la app
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'filiales', loadChildren: () => import('./filiales/filiales.module').then(m => m.FilialesModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
