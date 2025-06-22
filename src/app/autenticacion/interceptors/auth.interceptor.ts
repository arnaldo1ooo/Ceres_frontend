import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';
import { ConfigService } from 'src/app/compartido/services/config.service';
import { API_NOMBRE, API_URL_BD_ACTUAL, API_URL_DEPARTAMENTOS, API_URL_IS_NOMBRE_USUARIO_EXISTE, API_URL_LOGIN, API_URL_PERMISOS_USUARIO_LOGUEADO, API_URL_SUCURSALES, API_URL_TENANTS_VALIDAR, API_URL_VERSION_ACTUAL } from 'src/app/compartido/constantes/constantes';



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
    let headers = request.headers.set('Authorization', `Bearer ${token}`);

    if (this.isUrlRequiereAutenticacion(request.url)) {
      if (HelpersService.isNoNulo(token) && HelpersService.isNoUndefined(token)) {  //Si existe token almacenado
        if (!HelpersService.isTokenExpirado(token)) {
          let requestConToken;

          if (request.url == API_URL_PERMISOS_USUARIO_LOGUEADO) {
            requestConToken = request.clone({
              headers: headers,
              url: this._configService.apiUrlServer + request.url
            })
          }
          else {
            requestConToken = request.clone({
              headers: headers
            })
          }

          return next.handle(requestConToken);  //Regirige al request ya con el header Authorization
        }

        console.log("Sesión expirada, rediriendo a login..");
        this.logoutYredigirLogin();
      }

      //console.log("token vacio, rediriendo a login..");
      this.logoutYredigirLogin();
    }
    else {
      //enviamos el tenant en el header ya que no contamos con token
      const tenantKey = this._authService.getTenantKeyAlmacenado();
      if (tenantKey) {
       headers = headers.set('X-Tenant-Key', tenantKey); //Agregamos el tenant
      }

      request = request.clone({
        headers: headers
      })


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

  public isUrlRequiereAutenticacion(url: string): boolean {
    return url != API_URL_LOGIN
      && !url.includes(API_URL_IS_NOMBRE_USUARIO_EXISTE)
      && url != API_URL_VERSION_ACTUAL
      && url != API_URL_BD_ACTUAL
      && !url.includes(API_URL_TENANTS_VALIDAR)
      && !url.includes(API_URL_SUCURSALES)
      && !url.includes(API_URL_DEPARTAMENTOS);
  }
}
