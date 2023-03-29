import { Injectable } from '@angular/core';
import { API_URL_LOGIN } from 'src/app/compartido/constantes/constantes';

import { Login } from '../model/login';
import { AuthService } from './../../../autenticacion/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService: AuthService
  ) { }

  login(credenciales: Login) {
    return this.authService.login(credenciales, API_URL_LOGIN);
  }


}
