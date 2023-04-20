import { Injectable } from '@angular/core';
import { LocalDateTime } from '@js-joda/core';

@Injectable({
  providedIn: 'root'
})
export class FechaHelpersService {

  constructor() { }

  public static fechaHoraActual(): Date {
    return new Date();
  }

  public static asignarHoraAFechaDate(fecha: Date, hora: number, minuto: number, segundo: number): Date {
    return new Date(fecha.getFullYear(),
            fecha.getMonth(), fecha.getDate(), hora, minuto, segundo);
  }

  public static asignarHoraAFechaLDT(fecha: LocalDateTime, hora: number, minuto: number, segundo: number): LocalDateTime {
    return fecha.withHour(hora).withMinute(minuto).withSecond(segundo);
  }

  public static dateALocalDateTime(date: Date): LocalDateTime {
    // Crear una instancia de LocalDateTime con los valores del objeto Date
    const localDateTime = LocalDateTime.of(date.getFullYear(), date.getMonth() + 1, date.getDate());

    // Asignar las horas, minutos y segundos por separado
    return localDateTime.withHour(date.getHours()).withMinute(date.getMinutes()).withSecond(date.getSeconds());
  }

}

