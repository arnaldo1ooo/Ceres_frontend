import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formaPagoPipe'
})
export class FormaPagoPipe implements PipeTransform {

  transform(valor: string): string {
    switch(valor){
      case 'E' : return 'EFECTIVO'
    }

    return '';
  }

}
