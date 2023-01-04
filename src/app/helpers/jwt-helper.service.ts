import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  constructor() { }

  getTokenAlmacenado() {
    return localStorage.getItem('token')
  }

  public isTokenExpirado(): boolean {
    const token= this.getTokenAlmacenado();

    if (token != null) {
      const fechaExpiracion = (JSON.parse(atob(token.split('.')[1]))).exp;
      console.log(fechaExpiracion * 1000);
      console.log(Date.now());
      console.log(fechaExpiracion * 1000 > Date.now());
      return fechaExpiracion * 1000 < Date.now();
    }

    return false;
  }
}
