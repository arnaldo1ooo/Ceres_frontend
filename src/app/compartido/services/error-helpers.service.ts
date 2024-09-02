import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHelpersService {

  constructor() { }

  public static isErrorRequerido(valor: any) {
    return valor?.hasError('required') //En ?.hasError ya valida si es nulo
  }

  public static isErrorTamanhoMin(valor: any) {
    return valor?.hasError('minlength');
  }

  public static isErrorTamanhoMax(valor: any) {
    return valor?.hasError('maxlength')
  }

  public static isErrorEmail(valor: any) {
    return valor?.hasError('email')
  }

  public static isErrorArrayVacio(valor: any) {
    return valor?.hasError('arrayVacio')
  }

  public static isErrorDebenSerIguales(valor: any) {
    return valor?.hasError('noSonIguales')
  }

  public static isErrorAutocompleteSeleccionInvalida(valor: any) {
    return valor?.hasError('autocompleteSeleccionInvalida')
  }

  public static isErrorMaxLengthNumber(valor: any) {
    return valor?.hasError('maxLengthNumber')
  }

  public static verificarMensajeError(valor: any): string {
    if (this.isErrorRequerido(valor)) {
      return 'Campo obligatorio';
    }
    else if (this.isErrorTamanhoMin(valor)) {
      const minCaracteres = valor.errors ? valor.errors['minlength']['requiredLength'] : null; //Se obtiene el minimo requerido
      return `Tamaño mínimo es de ${minCaracteres} caracteres`;
    }
    else if (this.isErrorTamanhoMax(valor)) {
      const maxCaracteres = valor.errors ? valor.errors['maxlength']['requiredLength'] : null; //Se obtiene el maximo requerido
      return `Tamaño máximo es de ${maxCaracteres} caracteres`;
    }
    else if (this.isErrorEmail(valor)) {
      return 'El email debe poseer un formato válido!';
    }
    else if (this.isErrorArrayVacio(valor)) {
      return 'Selecione al menos un elemento!';
    }
    else if (this.isErrorDebenSerIguales(valor)) {
      return 'Los valores no coinciden!';
    }
    else if (this.isErrorAutocompleteSeleccionInvalida(valor)) {
      return 'Seleccione una opción válida!';
    }
    else if (this.isErrorMaxLengthNumber(valor)) {
      return 'Tamaño máximo es de ' + valor.errors.maxLengthNumber.maxLength + ' caracteres';
    }

    return 'Campo inválido';
  }


}
