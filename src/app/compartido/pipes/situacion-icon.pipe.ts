import { Pipe, PipeTransform } from '@angular/core';

//Pipe de ejemplo, caso situacion sea A, muestra un icono
@Pipe({
  name: 'situacionIcon'
})
export class SituacionIconPipe implements PipeTransform {

  transform(valor: string): string {
    switch(valor){
      case 'A' : return 'toggle_on'
      case 'I' : return 'toggle_off'
    }

    return 'help_outline';
  }

}
