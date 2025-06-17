import { AbstractControl } from '@angular/forms';

export function convertirToMinus(cadena: string): string {
  try {
    return cadena.toLocaleLowerCase();
  }
  catch {
    return cadena;
  }
}

export function convertirToMayus(cadena: string): string {
  try {
    if (cadena === null || cadena === undefined) {
      return cadena;
    }

    return cadena.toUpperCase();
  } catch (error) {
    return cadena;
  }
}

export function stringToNumber(cadena: string) {
  return Number(cadena);
}

export function stringToBase64(texto: string): string {
  return btoa(unescape(encodeURIComponent(texto)));
}

export function base64ToString(base64: string): string {
  return decodeURIComponent(escape(atob(base64)));
}

export function RequerirAutocomplete(control: AbstractControl) {
  const selection: any = control.value;
  if (typeof selection === 'string') {
    return { incorrect: true };
  }

  return null;
}
