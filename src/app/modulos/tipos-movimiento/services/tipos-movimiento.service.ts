import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, firstValueFrom, throwError } from 'rxjs';
import { TipoMovimiento } from '../models/tipo-movimiento';

import { MovimientoListaDTO } from './../../movimientos/model/dtos/movimientoListaDTO';
import { API_URL_TIPOS_MOVIMIENTO } from 'src/app/compartido/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class TiposMovimientoService {

  constructor(
    private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend

  //METODOS
  listarTodosTiposMovimiento() {  //Retorna un observable, para leer su retorno se debe suscribir
    return this._httpClient.get<MovimientoListaDTO[]>(API_URL_TIPOS_MOVIMIENTO)
      .pipe(
        first(),
        delay(100),
        catchError(() => {
          const error = new Error('Ocurrió un error en el servidor');
          return throwError(() => error);
        })
      );
  }

  //Sincronica, usar await al llamar para esperar a que se complete el llamado para continuar la ejecucion
  public async cargarPorId(id: string): Promise<TipoMovimiento> {
    try {
      let respuesta = await firstValueFrom(this._httpClient.get<TipoMovimiento>(`${API_URL_TIPOS_MOVIMIENTO}/${id}`));
      return respuesta;

    } catch (error) {
      throw error; // Relanzar el error para que pueda ser manejado en un nivel superior
    }
  }
}
