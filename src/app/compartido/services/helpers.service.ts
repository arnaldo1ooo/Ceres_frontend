import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(

  ) { }

  public static isTokenExpirado(token: any): boolean {
    /*return !this.jwtHelperService.isTokenExpired(token);*/
    const fechaExpiracion = (JSON.parse(atob(token.split('.')[1]))).exp;
    return fechaExpiracion * 1000 < Date.now();
  }

  public static limpiarStorage() {
    localStorage.clear;
  }

  public static removerItemDelStorage(key: string) {
    localStorage.removeItem(key);
  }

  public static salvarItemEnStorage(key: string, valor: string) {
    localStorage.setItem(key, valor);
  }

  public static obtenerItemDelStorage(key: string) {
    return localStorage.getItem(key);
  }

  public static isNulo(valor: any) {
    return valor == null;
  }

  public static isNoNulo(valor: any) {
    return valor != null;
  }

  public static isVacio(valor: any) {
    return valor == '';
  }

  public static isNoVacio(valor: any) {
    return valor != '';
  }

  public static isUndefined(valor: any) {
    return valor == 'undefined';
  }

  public static isNoUndefined(valor: any) {
    return valor != 'undefined';
  }

  public static isNoNuloYNoVacio(valor: any) {
    return HelpersService.isNoNulo(valor) && this.isNoVacio(valor);
  }

  public static isNoNuloYNoVacioYNoUndefined(valor: any) {
    return this.isNoNuloYNoVacio(valor) && this.isNoUndefined(valor);
  }

  public static isNuloRetornaVacio(valor: any) {
    return this.isNulo(valor) ? '' : valor;
  }

  public static isModoVisualizar(path: any): boolean {
    return path.includes('visualizar');
  }

  public static isModoEditar(path: any): boolean {
    return path.includes('editar');
  }

  public static isModoNuevo(path: any): boolean {
    return path.includes('nuevo');
  }

  public static urlDistintoALogin(url: any) {
    return url != null && !url.includes('login');
  }

}
