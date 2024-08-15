import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Login } from 'src/app/modulos/login/model/login';
import { API_URL_IS_NOMBRE_USUARIO_EXISTE } from 'src/app/compartido/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionIniciada; //Se piede el valor al recargar pagina

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
    this.sesionIniciada = new BehaviorSubject<boolean>(this.isTokenValido(this.getTokenAlmacenado()));
  }

  login(credenciales: Login, API: string) {
    return this._httpClient.post(API, credenciales, { observe: 'response' })
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
    HelpersService.removerItemDelLocalStorage('token');
    this._router.navigate(['login']);
  }

  getTokenAlmacenado() {
    return HelpersService.obtenerItemDelLocalStorage('token');
  }

  salvarTokenEnLocalStorage(token: string) {
    HelpersService.salvarItemEnLocalStorage('token', token);
  }

  public get isSesionIniciada() {
    return this.sesionIniciada.asObservable();
  }

  public isTokenValido(token: any): boolean {
    return HelpersService.isNoNuloYNoVacioYNoUndefined(token)
      && !HelpersService.isTokenExpirado(token);
  }

  public async isNombreUsuarioExiste(nombreUsuario: string): Promise<boolean> {
    try {
      return await firstValueFrom(this._httpClient.get<boolean>(API_URL_IS_NOMBRE_USUARIO_EXISTE
        + `?nombreUsuario=${nombreUsuario}`));

    } catch (error) {
      console.error(error);
      throw error; // Relanzar el error para que pueda ser manejado en un nivel superior
    }
  }

}
