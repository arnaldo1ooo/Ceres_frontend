import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'situacion'
})
export class SituacionPipe implements PipeTransform {

  transform(valor: string): string {
    switch(valor){
      case 'ACTIVO' : return 'toggle_on'
      case 'INACTIVO' : return 'toggle_off'


    }

    return 'help_outline';
  }

}
