import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, Observable, throwError } from 'rxjs';

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
        delay(100),
        catchError((error) => {
          // Aquí puedes realizar el tratamiento de errores según tus necesidades
          console.error('Ocurrió un error en la solicitud HTTP:', error);
          // Puedes lanzar un nuevo error o devolver un valor por defecto en caso de error
          return [] //Devuelve lista vacia
        })
      );
  }
}
