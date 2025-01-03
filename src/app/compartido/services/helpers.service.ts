import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ModoEdicion } from '../enums/modoEdicion.enum';
@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  public static isTokenExpirado(token: any): boolean {
    if (this.isNoNuloYNoVacio(token)) {
      const fechaExpiracion = (JSON.parse(atob(token.split('.')[1]))).exp;
      return fechaExpiracion * 1000 < Date.now();
    }

    return true;
  }

  public static limpiarStorage() {
    localStorage.clear;
  }

  public static removerItemDelLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  public static salvarItemEnLocalStorage(key: string, valor: string) {
    localStorage.setItem(key, valor);
  }

  public static obtenerItemDelLocalStorage(key: string): string {
    const resultado = localStorage.getItem(key);
    return resultado != null ? resultado : '';
  }

  public static removerItemDelSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  public static salvarItemEnSessionStorage(key: string, valor: any) {
    if (typeof valor === 'object') {
      valor = JSON.stringify(valor);
    }

    sessionStorage.setItem(key, valor);
  }

  public static obtenerItemDelSessionStorage(key: string) {

    const valor = sessionStorage.getItem(key);

    if(valor != null && valor != undefined) {
      return JSON.parse(valor!);
    }
    else {
      return null;
    }
  }

  public static isNulo(valor: any): boolean {
    return valor == null;
  }

  public static isNoNulo(valor: any): boolean {
    return valor != null;
  }

  public static isVacio(valor: any): boolean {
    return valor === '';
  }

  public static isNoVacio(valor: string): boolean {
    return valor !== '';
  }

  public static isNuloOrVacio(valor: any): boolean {
    return valor == null || valor == '';
  }

  public static isUndefined(valor: any): boolean {
    return valor == 'undefined' && valor == undefined;
  }

  public static isNoUndefined(valor: any): boolean {
    return valor != 'undefined' && valor != undefined;
  }

  public static isNoNuloYNoVacio(valor: any): boolean {
    return this.isNoNulo(valor) && this.isNoVacio(valor);
  }

  public static isNoNuloYNoVacioYNoUndefined(valor: any): boolean {
    return this.isNoNuloYNoVacio(valor) && this.isNoUndefined(valor);
  }

  public static isNuloOrVacioOrUndefined(valor: any): boolean {
    return this.isNuloOrVacio(valor) || this.isUndefined(valor);
  }

  public static isNuloRetornaVacio(valor: any): boolean {
    return this.isNulo(valor) ? '' : valor;
  }

  public static isPathModoVisualizar(path: any): boolean {
    return path.includes('visualizar');
  }

  public static isPathModoEditar(path: any): boolean {
    return path.includes('editar');
  }

  public static isPathModoNuevo(path: any): boolean {
    return path.includes('nuevo');
  }

  public static isMayorACero(valor: number): boolean {
    return this.isNoNuloYNoVacioYNoUndefined(valor) && valor > 0;
  }

  public static isMayorIgualACero(valor: number): boolean {
    return valor > 0 || valor == 0;
  }

  public static isMenorACero(valor: number): boolean {
    return valor < 0;
  }

  public static isMenorIgualACero(valor: number): boolean {
    return valor < 0 || valor == 0;
  }

  public static isMayorQue(valor1: number, valor2: number): boolean {
    return valor1 != null && valor2 != null && valor1 > valor2;
  }

  public static isMenorQue(valor1: number, valor2: number): boolean {
    return valor1 != null && valor2 != null && valor1 < valor2;
  }

  public static isIgualOMayorQue(valor1: number, valor2: number): boolean {
    return valor1 != null && valor2 != null && valor1 >= valor2;
  }

  public static isIgualOMenorQue(valor1: number, valor2: number): boolean {
    return valor1 != null && valor2 != null && valor1 <= valor2;
  }

  public static isCadenaTexto(cadena: string): boolean {
    if (cadena === null || cadena === undefined) {
      return false;
    }
    try {
      cadena.toUpperCase();
      return true;
    } catch (error) {
      return false;
    }
  }

  public static convertirToMayus(cadena: string): string {
    try {
      if (cadena === null || cadena === undefined) {
        return cadena;
      }

      return cadena.toUpperCase();
    } catch (error) {
      return cadena;
    }
  }

  public static idTodosReturnVacio(valor: string): string {
    return valor != "-1" ? valor : "";
  }

  public static compararOpcionesSelect(opcion: any, opcionSeleccionada: any): boolean {
    if (opcion && opcionSeleccionada) {
      if (this.isNoUndefined(opcion.id) && this.isNoUndefined(opcionSeleccionada.id)) {
        return opcion.id === opcionSeleccionada.id
      }
      else if (this.isNoUndefined(opcion._id) && this.isNoUndefined(opcionSeleccionada._id)) {
        return opcion._id === opcionSeleccionada._id
      }
    }

    return opcion == opcionSeleccionada;
  }

  public static removerAcentos(cadena: string): string {
    return cadena.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  public static convertirToMinus(cadena: string): string {
    try {
      return cadena.toLocaleLowerCase();
    }
    catch {
      return cadena;
    }
  }

  public static isModoNuevo(modoEdicion: string): boolean {
    return modoEdicion != null && modoEdicion == ModoEdicion.MODO_NUEVO;
  }

  public static isModoEditar(modoEdicion: string): boolean {
    return modoEdicion != null && modoEdicion == ModoEdicion.MODO_EDITAR;
  }

  public static isModoVisualizar(modoEdicion: string): boolean {
    return modoEdicion != null && modoEdicion == ModoEdicion.MODO_VISUALIZAR;
  }

  public static stringToNumber(cadena: string) {
    return Number(cadena);
  }

}

export function RequerirAutocomplete(control: AbstractControl) {
  const selection: any = control.value;
  if (typeof selection === 'string') {
    return { incorrect: true };
  }

  return null;
}
