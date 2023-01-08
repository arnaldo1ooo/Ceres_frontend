import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(

  ) { }

  public isTokenExpirado(token: string): boolean {
    /*return !this.jwtHelperService.isTokenExpired(token);*/
    const fechaExpiracion = (JSON.parse(atob(token.split('.')[1]))).exp;
    return fechaExpiracion * 1000 < Date.now();
  }

  public limpiarStorage() {
    localStorage.clear;
  }

  public removerItemDelStorage(key: string) {
    localStorage.removeItem(key);
  }

  public salvarItemEnStorage(key: string, valor: string) {
    localStorage.setItem(key, valor);
  }

  public obtenerItemDelStorage(key: string){
    return localStorage.getItem(key);
  }

}
