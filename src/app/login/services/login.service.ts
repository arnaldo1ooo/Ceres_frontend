import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:8180/login';

  constructor(
    private http: HttpClient
    ) {

    }

  login(credenciales: Login) {
    return this.http.post(this.API, credenciales, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;

        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer', '');

        localStorage.setItem('token', token); //Se guarda el token por si el usuario cierra la ventana y con esto no tenga que volver a iniciar sesion

        return body;
      }));
  }

  getTokenAlmacenado(){
    return localStorage.getItem('token')
  }
}
