import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Login } from 'src/app/modulos/login/model/login';

import { HelpersService } from '../../compartido/services/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionIniciada = new BehaviorSubject<boolean>(false);

  constructor(
    private helpersService: HelpersService,
    private http: HttpClient
  ) { }

  login(credenciales: Login, API: string) {
    return this.http.post(API, credenciales, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;

        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer', '');

        this.salvarTokenEnLocalStorage(token); //Se guarda el token por si el usuario cierra la ventana y con esto no tenga que volver a iniciar sesion

        if (this.helpersService.isNoNuloOrVacioOrUndefined(token)
          && !this.helpersService.isTokenExpirado(token)) {
          this.sesionIniciada.next(true); //Caso el token sea valido, sesion iniciada true
        }

        return body;
      }));
  }

  cerrarSesion() {
    this.sesionIniciada.next(false);
    this.helpersService.removerItemDelStorage('token');
  }

  getTokenAlmacenado() {
    return this.helpersService.obtenerItemDelStorage('token');
  }

  salvarTokenEnLocalStorage(token: string) {
    this.helpersService.salvarItemEnStorage('token', token);
  }

  get isSesionIniciada() {
    return this.sesionIniciada.asObservable();
  }




}
