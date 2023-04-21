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

  public static asignarHoraAFechaLDT(fecha: LocalDateTime | null, hora: number, minuto: number, segundo: number): LocalDateTime | null {
    return fecha != null
            ? fecha.withHour(hora).withMinute(minuto).withSecond(segundo)
            : null;
  }

  public static dateALocalDateTime(fecha: Date | null): LocalDateTime | null{
    if (fecha != null) {
      // Crear una instancia de LocalDateTime con los valores del objeto Date
      const localDateTime = LocalDateTime.of(fecha.getFullYear(), fecha.getMonth() + 1, fecha.getDate());

      // Asignar las horas, minutos y segundos por separado
      return localDateTime.withHour(fecha.getHours()).withMinute(fecha.getMinutes()).withSecond(fecha.getSeconds());
    }

    return null;
  }

}

