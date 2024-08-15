import { Injectable } from '@angular/core';
import { Moneda } from 'src/app/modulos/monedas/models/moneda';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class MonedaHelpersService {

  constructor() { }

  public static formatearValorMoneda(valor: number, moneda: Moneda): string {
    try {
      if (HelpersService.isNoNuloYNoVacioYNoUndefined(valor)
          && moneda != null && HelpersService.isMayorACero(Number(moneda._id))) {
        const opciones = {
          style: 'currency',
          currency: moneda.codigoIso || undefined,
          currencyDisplay: 'symbol',
          minimumFractionDigits: moneda.cantidadDecimales || undefined, //Número mínimo de dígitos decimales
          maximumFractionDigits: moneda.cantidadDecimales || undefined, //Número máximo de dígitos decimales
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
