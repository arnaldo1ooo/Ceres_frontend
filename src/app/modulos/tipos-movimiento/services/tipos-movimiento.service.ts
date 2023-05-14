import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { API_URL_TIPOS_MOVIMIENTO } from './../../../compartido/constantes/constantes';
import { MovimientoListaDTO } from './../../movimientos/model/dtos/movimientoListaDTO';

@Injectable({
  providedIn: 'root'
})
export class TiposMovimientoService {

  constructor(private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosTiposMovimiento() {
    return this._httpClient.get<MovimientoListaDTO[]>(API_URL_TIPOS_MOVIMIENTO)
      .pipe(
        first(),
        delay(100)
      );
  }
}
