import { Injectable } from '@angular/core';
import { LocalDateTime } from '@js-joda/core';
import * as moment from 'moment';
import { HORA_FINAL, MINUTO_FINAL, SEGUNDO_FINAL } from '../constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class FechaHelpersService {

  constructor() { }

  public static getFechaHoraActual(): Date {
    return new Date();
  }

  public static getFechaHoraActualLDT(): LocalDateTime {
    return LocalDateTime.now();
  }

  public static getPrimerDiaDelAnho(): Date {
    const fechaActual = new Date(); // Fecha actual
    const primerDia = new Date(fechaActual.getFullYear(), 0, 1);
    return primerDia;
  }

  public static getPrimerDiaDelMes(): Date {
    const fechaActual = new Date(); // Fecha actual
    const primerDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1); // Primer día del mes actual
    return primerDia;
  }

  public static getUltimoDiaDelMesActual(): Date {
    const fechaActual = new Date(); // Crea una nueva instancia de Date con la fecha actual
    const ultimoDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0); // Crea una nueva instancia de Date con el último día del mes actual
    return ultimoDia; // Retorna el último día del mes actual
  }

  public static asignarHoraAFechaDate(fecha: Date, hora: number, minuto: number, segundo: number): Date {
    return new Date(fecha.getFullYear(),
      fecha.getMonth(), fecha.getDate(), hora, minuto, segundo);
  }

  public static asignarHoraAFechaLDT(fecha: LocalDateTime | null, hora: number, minuto: number, segundo: number): LocalDateTime | null {
    return fecha != null
      ? fecha.withHour(hora).withMinute(minuto).withSecond(segundo)
      : null;
  }

  public static dateALocalDateTime(fecha: Date | null): LocalDateTime | null {
    if (fecha != null) {
      // Crear una instancia de LocalDateTime con los valores del objeto Date
      const localDateTime = LocalDateTime.of(fecha.getFullYear(), fecha.getMonth() + 1, fecha.getDate());

      // Asignar las horas, minutos y segundos por separado
      return localDateTime.withHour(fecha.getHours()).withMinute(fecha.getMinutes()).withSecond(fecha.getSeconds());
    }

    return null;
  }

  public static formatearFecha(fecha: Date | null): string {
    return (moment(fecha)).format('DD/MM/yyyy HH:mm:ss')
  }

}

