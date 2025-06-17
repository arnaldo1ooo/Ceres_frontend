import { Pipe, PipeTransform } from '@angular/core';
import { FormaPago, FormaPagoUtils } from '../enums/forma-pago.enum';

@Pipe({
  name: 'formaPagoPipe'
})
export class FormaPagoPipe implements PipeTransform {

  transform(key: string): string {
    return FormaPagoUtils.getDescripcionByKey(key);
  }

}
