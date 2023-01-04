import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './compartido/helpers/auth.guard';
import { HomeComponent } from './home/containers/home/home.component';
import { LoginModule } from './login/login.module';


//Aca se encuentras las rutas del proyecto, el CanActivate el guard (guardian o vigilante) verifica si existe un token almacenado, caso sea falso redirige al login
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] }, // Carga EAGER //Cuando path es vacio, redirecciona al home, caso tenga token almacenado (CanActivate)
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, //Carga asincrona (LAZY Loading) requiere que el componente tenga un routing
  { path: 'home', canActivate: [AuthGuard], canLoad: [AuthGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'filiales', canActivate: [AuthGuard], canLoad: [AuthGuard], loadChildren: () => import('./filiales/filiales.module').then(m => m.FilialesModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
