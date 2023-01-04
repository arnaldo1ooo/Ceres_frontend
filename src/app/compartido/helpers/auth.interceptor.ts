import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { //Intercepta el token almacenado
    let token = this.loginService.getTokenAlmacenado();

    if (token != null && token != 'undefined') {  //Si existe token almacenado
      let clonado = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)  //Envia el token local desde el header Authorization
      })

      return next.handle(clonado);
    }

    return next.handle(request);
  }
}
