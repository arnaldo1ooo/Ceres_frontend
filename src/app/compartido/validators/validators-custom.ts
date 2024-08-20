import { AbstractControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class ValidatorsCustom extends Validators {

  static arrayNoVacio(control: AbstractControl): ValidationErrors | null {
    const array = control as FormArray;
    return array.length > 0
      ? null : { arrayVacio: true };
  }

  static debenSerIguales(nombrePrimerControl: string, nombreSegundoControl: string): ValidatorFn {
    return (grupo: AbstractControl): ValidationErrors | null => {
      const primerControl = grupo.get(nombrePrimerControl);
      const segundoControl = grupo.get(nombreSegundoControl);

      return primerControl?.value === segundoControl?.value
        ? null : { noSonIguales: true };
    };
  }

  static alMenosUnNumero(control: AbstractControl): ValidationErrors | null {
    return /\d+/.test(control.value)
      ? null : { alMenosUnNumero: true };
  }

  static alMenosUnaMayuscula(control: AbstractControl): ValidationErrors | null {
    return /[A-Z]+/.test(control.value)
      ? null : { alMenosUnaMayuscula: true };
  }

  static alMenosUnaMinuscula(control: AbstractControl): ValidationErrors | null {
    return /[a-z]+/.test(control.value)
      ? null : { alMenosUnaMinuscula: true };
  }

  static debenSerDiferentes(nombrePrimerControl: string, nombreSegundoControl: string): ValidatorFn {
    return (grupo: AbstractControl): ValidationErrors | null => {
      const primerControl = grupo.get(nombrePrimerControl);
      const segundoControl = grupo.get(nombreSegundoControl);

      return primerControl?.value !== segundoControl?.value
        ? null : { debenSerDiferentes: true };
    };
  }
}


