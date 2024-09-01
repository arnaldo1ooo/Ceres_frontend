import { AbstractControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class ValidatorsCustom extends Validators {

  public static arrayNoVacio(control: AbstractControl): ValidationErrors | null {
    const array = control as FormArray;
    return array.length > 0
      ? null : { arrayVacio: true };
  }

  public static debenSerIguales(nombrePrimerControl: string, nombreSegundoControl: string): ValidatorFn {
    return (grupo: AbstractControl): ValidationErrors | null => {
      const primerControl = grupo.get(nombrePrimerControl);
      const segundoControl = grupo.get(nombreSegundoControl);

      return primerControl?.value === segundoControl?.value
        ? null : { noSonIguales: true };
    };
  }

  public static alMenosUnNumero(control: AbstractControl): ValidationErrors | null {
    return /\d+/.test(control.value)
      ? null : { alMenosUnNumero: true };
  }

  public static alMenosUnaMayuscula(control: AbstractControl): ValidationErrors | null {
    return /[A-Z]+/.test(control.value)
      ? null : { alMenosUnaMayuscula: true };
  }

  public static alMenosUnaMinuscula(control: AbstractControl): ValidationErrors | null {
    return /[a-z]+/.test(control.value)
      ? null : { alMenosUnaMinuscula: true };
  }

  public static debenSerDiferentes(nombrePrimerControl: string, nombreSegundoControl: string): ValidatorFn {
    return (grupo: AbstractControl): ValidationErrors | null => {
      const primerControl = grupo.get(nombrePrimerControl);
      const segundoControl = grupo.get(nombreSegundoControl);

      return primerControl?.value !== segundoControl?.value
        ? null : { debenSerDiferentes: true };
    };
  }

  public static autocompleteSeleccionValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof control.value === 'string') {
        return { 'autocompleteSeleccionInvalida': { value: control.value } }
      }

      return null  //opcion seleccionada valida
    }
  }

}


