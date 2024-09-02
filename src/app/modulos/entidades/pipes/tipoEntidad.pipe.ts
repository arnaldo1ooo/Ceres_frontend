import { Pipe, PipeTransform } from '@angular/core';
import { TipoEntidad, TipoEntidadUtils } from '../enums/tipo-entidad.enum';

@Pipe({
  name: 'tipoEntidadPipe'
})
export class TipoEntidadPipe implements PipeTransform {

  transform(valor: string): string {
    const tipoEntidad = Object.values(TipoEntidad).find(key => key === valor);

    if (tipoEntidad) {
      return TipoEntidadUtils.getDescripcion(tipoEntidad);
    }

    return '';
  }

}
