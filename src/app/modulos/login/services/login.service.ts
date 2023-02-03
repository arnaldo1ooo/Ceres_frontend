import { Injectable } from '@angular/core';

import { Login } from '../model/login';
import { AuthService } from './../../../autenticacion/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:8180/login';

  constructor(
    private authService: AuthService
  ) { }

  login(credenciales: Login) {
    return this.authService.login(credenciales, this.API);
  }


}
