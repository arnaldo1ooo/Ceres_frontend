import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable } from 'rxjs';

import { Entidad } from '../models/entidad';
import { API_URL_ENTIDADES } from './../../../compartido/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  constructor(private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend

  public listarTodosEntidades() {
    return this._httpClient.get<Entidad[]>(API_URL_ENTIDADES)
      .pipe(
        first(),
        delay(100)
      );
  }

  public listarEntidadesPorClases(idsClaseEntidad: string) {
    return this._httpClient.get<Entidad[]>(API_URL_ENTIDADES
      + '/filtrarPorClases?' + `idsClaseEntidad=${idsClaseEntidad}`)
      .pipe(
        first(),
        delay(100)
      );
  }
}
