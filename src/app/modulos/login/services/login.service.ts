import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_BD_ACTUAL, API_URL_LOGIN } from 'src/app/compartido/constantes/constantes';

import { Login } from '../model/login';
import { AuthService } from './../../../autenticacion/services/auth.service';
import { API_URL_VERSION_ACTUAL } from '../../../compartido/constantes/constantes';
import { HttpClient } from '@angular/common/http';
import { HelpersService } from '../../../compartido/services/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService: AuthService,
    private _httpClient: HttpClient
  ) { }

  public login(credenciales: Login) {
    return this.authService.login(credenciales, API_URL_LOGIN);
  }

  //metodo Sincronico, espera la respuesta para continuar
  public async isNombreUsuarioExiste(nombreUsuario: string): Promise<boolean> {
    return await this.authService.isNombreUsuarioExiste(nombreUsuario);
  }

  public getVersionBackeEnd(): Observable<string> {
    return this._httpClient.get(API_URL_VERSION_ACTUAL, { responseType: 'text' });  //Para recibir string
  }

  public getBaseDatosActual(): Observable<string> {
    return this._httpClient.get(API_URL_BD_ACTUAL, { responseType: 'text' });  //Para recibir string
  }

  public getDepartamentoLogado() {
    return HelpersService.obtenerItemDelSessionStorage('departamentoLogado');
  }

}
