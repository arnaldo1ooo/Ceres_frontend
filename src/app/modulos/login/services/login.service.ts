import { Injectable } from '@angular/core';
import { API_URL_LOGIN } from 'src/app/compartido/constantes/constantes';

import { Login } from '../model/login';
import { AuthService } from './../../../autenticacion/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginCredenciales: Login = new Login();

  constructor(
    private authService: AuthService
  ) { }

  public login(credenciales: Login) {
    return this.authService.login(credenciales, API_URL_LOGIN);
  }

  //metodo Sincronico, espera la respuesta para continuar
  public async isNombreUsuarioExiste(nombreUsuario: string): Promise<boolean> {
    return await this.authService.isNombreUsuarioExiste(nombreUsuario);
  }


}
