import { Pipe, PipeTransform } from '@angular/core';
import { EstadoOrden, EstadoOrdenUtils } from '../enums/estado-orden.enum';

@Pipe({
  name: 'estadoOrden',
  standalone: true
})
export class EstadoOrdenPipe implements PipeTransform {

  transform(value: EstadoOrden): string {
    return EstadoOrdenUtils.getDescripcion(value);
  }

}
