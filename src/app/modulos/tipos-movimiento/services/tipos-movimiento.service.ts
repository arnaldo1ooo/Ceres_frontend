import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, firstValueFrom, Observable, throwError } from 'rxjs';
import { TipoMovimiento } from '../models/tipo-movimiento';

import { API_URL_TIPOS_MOVIMIENTO } from './../../../compartido/constantes/constantes';
import { MovimientoListaDTO } from './../../movimientos/model/dtos/movimientoListaDTO';

@Injectable({
  providedIn: 'root'
})
export class TiposMovimientoService {
  private idTipoMovSeleccionado: string = '';

  constructor(private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend


  //GETTERS Y SETTERS
  getIdTipoMovSeleccionado(): string {
    return this.idTipoMovSeleccionado;
  }

  setIdTipoMovSeleccionado(idTipoMovSeleccionado: string) {
    this.idTipoMovSeleccionado = idTipoMovSeleccionado;
  }


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
  async cargarPorId(id: string): Promise<TipoMovimiento> {
    try {
      const respuesta = await firstValueFrom(this._httpClient.get<TipoMovimiento>(`${API_URL_TIPOS_MOVIMIENTO}/${id}`));
      return respuesta;

    } catch (error) {
      console.error(error);
      throw error; // Relanzar el error para que pueda ser manejado en un nivel superior
    }
  }
}
