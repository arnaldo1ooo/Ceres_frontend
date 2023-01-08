import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';

import { HelpersService } from '../../compartido/services/helpers.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    private helpersService: HelpersService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { //Intercepta el token almacenado
    let token = this.loginService.getTokenAlmacenado();

    if (token != null && token != 'undefined' && !this.helpersService.isTokenExpirado(token)) {  //Si existe token almacenado
      let clonado = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)  //Envia el token local desde el header Authorization
      })

      return next.handle(clonado);  //Regirige al request ya con el header Authorization
    }

    console.log("Sesión expirada..");
    this.router.navigate(['login']) //Si no existe token o esta expirado redirige al login
    return next.handle(request);  //Redirige al request solicitado sin headers
  }
}
