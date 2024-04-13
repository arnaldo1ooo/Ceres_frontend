import { Injectable } from '@angular/core';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class MonedaHelpersService {

  constructor() { }

  public static formatearValorMoneda(valor: number, moneda: any): string {
    try {
      if (HelpersService.isNoNuloYNoVacioYNoUndefined(valor)
          && moneda != null && HelpersService.isMayorACero(moneda._id)) {
        const opciones = {
          style: 'currency',
          currency: moneda.codigoIso,
          currencyDisplay: 'symbol',
          minimumFractionDigits: moneda.cantidadDecimales, //Número mínimo de dígitos decimales
          maximumFractionDigits: moneda.cantidadDecimales, //Número máximo de dígitos decimales
          minimumIntegerDigits: 1, //Número mínimo de dígitos enteros
          useGrouping: true //Mostrar separador de miles
        };

        return valor.toLocaleString('es-PY', opciones);
      }
    } catch (error) {
      console.error('Error al formatear valor:', error);
      return '';
    }

    return '';
  }
}
