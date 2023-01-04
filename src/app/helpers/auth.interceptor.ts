import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JwtHelperService } from './jwt-helper.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private jwtHelperService: JwtHelperService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { //Intercepta el token almacenado
    const token = this.jwtHelperService.getTokenAlmacenado();

    if (token) {  //Si existe token almacenado
      const clonado = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)  //Envia el token local desde el header Authorization
      })

      return next.handle(clonado);
    }

    return next.handle(request);
  }
}
