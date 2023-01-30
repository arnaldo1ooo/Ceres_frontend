import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:8180/login';

  constructor(
    private http: HttpClient,
    private helpersService: HelpersService
  ) { }

  login(credenciales: Login) {
    return this.http.post(this.API, credenciales, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;

        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer', '');

        this.salvarTokenEnLocalStorage(token); //Se guarda el token por si el usuario cierra la ventana y con esto no tenga que volver a iniciar sesion

        return body;
      }));
  }

  /*cerrarSesion(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.helpersService.limpiarStorage();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }*/

  getTokenAlmacenado() {
    return this.helpersService.obtenerItemDelStorage('token');
  }

  salvarTokenEnLocalStorage(token: string) {
    this.helpersService.salvarItemEnStorage('token', token);
  }

}
