import { Pipe, PipeTransform } from '@angular/core';

//Para utilizar el pipe fuera de Compartido, se debe agregar el pipe a exports en compartido.module
@Pipe({
  name: 'situacionPipe'
})
export class SituacionPipe implements PipeTransform {

  transform(valor: string): string {
    switch(valor){
      case 'A' : return 'ACTIVO'
      case 'I' : return 'INACTIVO'
    }

    return '';
  }

}
