import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';
import { ConfigService } from 'src/app/compartido/services/config.service';
import { API_NOMBRE } from 'src/app/compartido/constantes/constantes';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _configService: ConfigService
  ) { }

  //INTERCEPTOR DE AUTENTICACION, intercepta el token
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._authService.getTokenAlmacenado(); //Intercepta el token almacenado

    if (this.urlDistintoALogin(request.url)) { //Si es distinto al login
      if (HelpersService.isNoNulo(token) && HelpersService.isNoUndefined(token)) {  //Si existe token almacenado
        if (!HelpersService.isTokenExpirado(token)) {
          let clonado = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)  //Envia el token local desde el header Authorization
          })

          return next.handle(clonado);  //Regirige al request ya con el header Authorization
        }

        console.log("Sesión expirada, rediriendo a login..");
        this.logoutYredigirLogin();
      }

      //console.log("token vacio, rediriendo a login..");
      this.logoutYredigirLogin();
    }

    //Agrega la URL del server caso no posea
    if (!request.url.startsWith('http') && !request.url.includes('assets')) {
      let requestModificado;

      if (request.url.includes('login')) { //login no usa nombre de api
        requestModificado = request.clone({
          url: this._configService.apiUrlServer + request.url
        });
      }
      else {
        requestModificado = request.clone({
          url: this._configService.apiUrlServer + API_NOMBRE + request.url
        });
      }

      request = requestModificado;
    }
    
    return next.handle(request);  //Redirige al request solicitado sin headers
  }

  logoutYredigirLogin() {
    this._authService.cerrarSesion();
    this._router.navigate(['login']) //Si no existe token o esta expirado redirige al login
  }

  public urlDistintoALogin(url: string): boolean {
    return url != null && !url.includes('login');
  }
}
