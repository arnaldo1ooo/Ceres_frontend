import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { JwtHelperService } from '../services/jwt-helper.service';

//Un guard es como un vigilante que controla que se cumpla ciertos criterios para mostrar un componente
/*(CanActivate) Antes de cargar los componentes de la ruta.
  (CanLoad) Antes de cargar los recursos (assets) de la ruta.
  (CanDeactivate) Antes de intentar salir de la ruta actual (usualmente utilizado para evitar salir de una ruta, si no se han guardado los datos).
  (CanActivateChild) Antes de cargar las rutas hijas de la ruta actual.*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.jwtHelperService.getTokenAlmacenado() && !this.jwtHelperService.isTokenExpirado()) { //Si existe token almacenado, dejará pasar
      return true;
    }

    this.router.navigate(['login']) //Si no existe token almacenado Redirige al login
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.jwtHelperService.getTokenAlmacenado() && !this.jwtHelperService.isTokenExpirado()) { //Si existe token almacenado y no está expirado, dejará pasar
      return true;
    }

    this.router.navigate(['login']) //Si no existe token almacenado Redirige al login
    return false;
  }

}
