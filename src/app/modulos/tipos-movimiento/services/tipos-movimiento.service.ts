import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, firstValueFrom, throwError } from 'rxjs';
import { TipoMovimiento } from '../models/tipo-movimiento';

import { MovimientoListaDTO } from './../../movimientos/model/dtos/movimientoListaDTO';
import { ApiEndpointsService } from 'src/app/compartido/services/api-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class TiposMovimientoService {

  constructor(
    private _httpClient: HttpClient,
    private _apiEndPointsService: ApiEndpointsService) { } //El httpClient permite la conexion con el backend

  //METODOS
  listarTodosTiposMovimiento() {  //Retorna un observable, para leer su retorno se debe suscribir
    return this._httpClient.get<MovimientoListaDTO[]>(this._apiEndPointsService.API_URL_TIPOS_MOVIMIENTO)
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
      let respuesta = await firstValueFrom(this._httpClient.get<TipoMovimiento>(`${this._apiEndPointsService.API_URL_TIPOS_MOVIMIENTO}/${id}`));
      return respuesta;

    } catch (error) {
      throw error; // Relanzar el error para que pueda ser manejado en un nivel superior
    }
  }
}
