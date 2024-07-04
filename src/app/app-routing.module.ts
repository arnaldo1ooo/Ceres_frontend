import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './autenticacion/guards/auth.guard';
import { HomeComponent } from './modulos/home/containers/home/home.component';


//Aca se encuentras las rutas del proyecto, el CanActivate el guard (guardian o vigilante) verifica si existe un token almacenado, caso sea falso redirige al login
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] }, // Carga EAGER //Cuando path es vacio, redirecciona al home, caso tenga token almacenado (CanActivate)
  { path: 'login', loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule) }, //Carga asincrona (LAZY Loading) requiere que el componente tenga un routing
  { path: 'home', canActivate: [AuthGuard], canLoad: [AuthGuard], loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) },
  { path: 'departamentos', canActivate: [AuthGuard], canLoad: [AuthGuard], loadChildren: () => import('./modulos/departamentos/departamentos.module').then(m => m.DepartamentosModule) },
  { path: 'entidades', canActivate: [AuthGuard], canLoad: [AuthGuard], loadChildren: () => import('./modulos/entidades/entidades.module').then(m => m.EntidadesModule) },
  { path: 'mercaderias', canActivate: [AuthGuard], canLoad: [AuthGuard], loadChildren: () => import('./modulos/mercaderias/mercaderias.module').then(m => m.MercaderiasModule) },
  { path: 'movimientos', canActivate: [AuthGuard], canLoad: [AuthGuard], loadChildren: () => import('./modulos/movimientos/movimientos.module').then(m => m.MovimientosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
