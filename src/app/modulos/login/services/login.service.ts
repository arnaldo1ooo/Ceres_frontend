import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Login } from '../model/login';
import { AuthService } from './../../../autenticacion/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../../sucursales/model/sucursal.model';
import { Departamento } from '../../departamentos/model/departamento.model';
import { API_URL_BD_ACTUAL, API_URL_LOGIN, API_URL_VERSION_ACTUAL } from 'src/app/compartido/constantes/constantes';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService: AuthService,
    private _httpClient: HttpClient) { }

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

  public getSucursalLogado(): Sucursal | null {
    const dptoLogado = this.getDepartamentoLogado();

    return dptoLogado ? dptoLogado.sucursal : null;
  }

  public getDepartamentoLogado(): Departamento | null {
    return HelpersService.obtenerItemDelSessionStorage('departamentoLogado') as Departamento;
  }

  public getNombreUsuarioLogado() {
    return HelpersService.obtenerItemDelSessionStorage('nombreUsuarioLogado');
  }

}
