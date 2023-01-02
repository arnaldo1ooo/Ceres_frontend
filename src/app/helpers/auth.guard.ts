import { LoginService } from 'src/app/login/services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//Un guard es como un vigilante que controla que se cumpla ciertos criterios para mostrar un componente
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginService.getTokenAlmacenado()) { //Si existe token almacenado, dejará pasar
      return true;
    }

    this.router.navigate(['login']) //Si no existe token almacenado Redirige al login
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.loginService.getTokenAlmacenado()) { //Si existe token almacenado, dejará pasar
      return true;
    }

    this.router.navigate(['login']) //Si no existe token almacenado Redirige al login
    return false;
  }

}
