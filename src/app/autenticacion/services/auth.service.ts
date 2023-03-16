import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Login } from 'src/app/modulos/login/model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionIniciada; //Se piede el valor al recargar pagina

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.sesionIniciada = new BehaviorSubject<boolean>(this.isTokenValido(this.getTokenAlmacenado()));
  }

  login(credenciales: Login, API: string) {
    return this.http.post(API, credenciales, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;

        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer', '');

        this.salvarTokenEnLocalStorage(token); //Se guarda el token por si el usuario cierra la ventana y con esto no tenga que volver a iniciar sesion

        if (this.isTokenValido(token)) {
          this.sesionIniciada.next(true); //Caso el token sea valido, sesion iniciada true
        }

        return body;
      }));
  }

  cerrarSesion() {
    this.sesionIniciada.next(false);
    HelpersService.removerItemDelStorage('token');
    this.router.navigate(['login']);
  }

  getTokenAlmacenado() {
    return HelpersService.obtenerItemDelStorage('token');
  }

  salvarTokenEnLocalStorage(token: string) {
    HelpersService.salvarItemEnStorage('token', token);
  }

  public get isSesionIniciada() {
    return this.sesionIniciada.asObservable();
  }

  public isTokenValido(token: any): boolean {
    return HelpersService.isNoNuloYNoVacioYNoUndefined(token)
      && !HelpersService.isTokenExpirado(token);
  }




}
