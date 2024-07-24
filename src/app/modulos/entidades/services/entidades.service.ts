import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, Observable, throwError } from 'rxjs';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { EntidadFiltroDTO } from '../models/dtos/entidadFiltroDTO';
import { EntidadListaDTO } from '../models/dtos/entidadListaDTO';

import { Entidad, Page } from '../models/entidad';
import { API_URL_ENTIDADES } from './../../../compartido/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  constructor(private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosEntidades() {
    return this._httpClient.get<EntidadListaDTO[]>(API_URL_ENTIDADES)
      .pipe(
        first(),
        delay(100)  //Espera de x segundos
      );
  }

  listarTodosEntidadesFiltroPage(entidadFiltro: EntidadFiltroDTO, pageRequest: PageRequest): Observable<Page> {
    return this._httpClient.get<Page>(API_URL_ENTIDADES
      + '/filtroPage?'
      + `id=${HelpersService.isNuloRetornaVacio(entidadFiltro.id)}`
      + `&nombreApellido=${HelpersService.isNuloRetornaVacio(entidadFiltro.nombreApellido)}`
      + `&idsClase=${entidadFiltro.idsClase}`
      + `&idSucursal=${HelpersService.idTodosReturnVacio(entidadFiltro.idSucursal)}`
      + `&ciRuc=${HelpersService.isNuloRetornaVacio(entidadFiltro.ciRuc)}`
      + `&idSituacion=${HelpersService.idTodosReturnVacio(entidadFiltro.idSituacion)}`
      + `&page=${pageRequest.pagina}&size=${pageRequest.tamanho}&sort=${pageRequest.ordenarPor},${pageRequest.orden}`);
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

  cargarPorId(id: string) {
    return this._httpClient.get<Entidad>(`${API_URL_ENTIDADES}/${id}`);
  }

  inactivar(id: string) {
    return this._httpClient.put<Entidad>(`${API_URL_ENTIDADES}/inactivar/${id}`, null).pipe(first());
  }
}
