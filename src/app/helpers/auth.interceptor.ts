import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from '../login/services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { //Intercepta el token almacenado
    const token = this.loginService.getTokenAlmacenado();

    if(token){  //Si existe token almacenado
      const clonado = request.clone({
        headers: request.headers.set('Autorizacion', `Bearer ${ token }`)
      })

      return next.handle(clonado);
    }

    return next.handle(request);
  }
}
