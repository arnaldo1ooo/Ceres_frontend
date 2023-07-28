import { Pipe, PipeTransform } from '@angular/core';

//Para utilizar el pipe fuera de Compartido, se debe agregar el pipe a exports en compartido.module
@Pipe({
  name: 'tipoMercaderiaPipe'
})
export class TipoMercaderiaPipe implements PipeTransform {

  transform(valor: string): string {
    switch(valor){
      case 'P' : return 'PRODUCTO'
      case 'S' : return 'SERVICIO'
    }

    return '';
  }

}
