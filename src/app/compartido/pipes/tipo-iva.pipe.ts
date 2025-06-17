import { Pipe, PipeTransform } from '@angular/core';

//Para utilizar el pipe fuera de Compartido, se debe agregar el pipe a exports en compartido.module
@Pipe({
  name: 'tipoIvaPipe',
  standalone: true // si usás Angular standalone components
})
export class TipoIvaPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    switch (value) {
      case '0':
        return 'Exenta';
      case '5':
        return 'IVA 5%';
      case '10':
        return 'IVA 10%';
      case null:
      case undefined:
        return 'Sin IVA';
      default:
        return `Desconocido (${value})`;
    }
  }
}
