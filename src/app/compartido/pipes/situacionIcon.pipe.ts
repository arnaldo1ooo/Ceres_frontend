import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'situacion'
})
export class SituacionPipe implements PipeTransform {

  transform(valor: string): string {
    switch(valor){
      case 'A' : return 'toggle_on'
      case 'I' : return 'toggle_off'


    }

    return 'help_outline';
  }

}
