import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HelpersService } from '../../compartido/services/helpers.service';
import { AuthService } from './../services/auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private helpersService: HelpersService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { //Intercepta el token almacenado
    const token = this.authService.getTokenAlmacenado();

    if (request.url != null && !request.url.includes('login')) { //Si es distinto al login
      if (token != null && token != 'undefined') {  //Si existe token almacenado
        if (!this.helpersService.isTokenExpirado(token)) {
          let clonado = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)  //Envia el token local desde el header Authorization
          })

          return next.handle(clonado);  //Regirige al request ya con el header Authorization
        }

        console.log("Sesión expirada, rediriendo a login..");
        this.logoutYredigirLogin();
      }

      console.log("token vacio, rediriendo a login..");
      this.logoutYredigirLogin();
    }

    return next.handle(request);  //Redirige al request solicitado sin headers
  }

 logoutYredigirLogin() {
    this.authService.cerrarSesion();
    this.router.navigate(['login']) //Si no existe token o esta expirado redirige al login
  }
}
