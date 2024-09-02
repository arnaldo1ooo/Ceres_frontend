import { Pipe, PipeTransform } from '@angular/core';
import { ClaseEntidad, ClaseEntidadUtils } from '../enums/clase-entidad.enum';

@Pipe({
  name: 'claseEntidadPipe'
})
export class ClaseEntidadPipe implements PipeTransform {

  transform(valor: string): string {
    const claseEntidad = Object.values(ClaseEntidad).find(key => key === valor);

    if (claseEntidad) {
      return ClaseEntidadUtils.getDescripcion(claseEntidad);
    }

    return '';
  }

}
