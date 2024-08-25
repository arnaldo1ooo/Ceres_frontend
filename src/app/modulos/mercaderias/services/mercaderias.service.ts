import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, map, Observable } from 'rxjs';
import { API_URL_MERCADERIAS } from 'src/app/compartido/constantes/constantes';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { MercaderiaFiltroDTO } from '../model/dtos/mercaderiaFiltroDTO';
import { Mercaderia } from '../model/mercaderia.model';
import { ApiPageResponse } from '../../../compartido/interfaces/api-page-response';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class MercaderiasService {

  constructor(private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosMercaderias() {
    return this._httpClient.get<Mercaderia[]>(API_URL_MERCADERIAS)
      .pipe(
        first(),
        delay(100)
      );
  }

  listarTodosMercaderiasActivos() {
    return this._httpClient.get<Mercaderia[]>(API_URL_MERCADERIAS + '/activos')
      .pipe(
        first(),
        delay(100)
      );
  }

  listarTodosMercaderiasFiltro() {
    return this._httpClient.get<Mercaderia[]>(API_URL_MERCADERIAS + '/filtro')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

  listarTodosMercaderiasFiltroPage(mercaderiaFiltro: MercaderiaFiltroDTO, pageRequest: PageRequest): Observable<ApiPageResponse> {
    return this._httpClient.get<ApiPageResponse>(API_URL_MERCADERIAS
      + '/filtroPage?' + `id=${mercaderiaFiltro.id}`
      + `&descripcion=${mercaderiaFiltro.descripcion}`
      + `&idTipo=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idTipo)}`
      + `&idDepartamento=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idDepartamento)}`
      + `&idSituacion=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idSituacion)}`
      + `&page=${pageRequest.pagina}&size=${pageRequest.tamanho}&sort=${pageRequest.ordenarPor},${pageRequest.orden}`);
  }

  guardar(mercaderia: Partial<Mercaderia>) { //Se usa Partial cuando se espera que no reciba todos los datos de la entidad
    if (mercaderia._id) {
      return this.actualizar(mercaderia);
    }

    return this.crear(mercaderia);
  }

  private crear(mercaderia: Partial<Mercaderia>) {
    return this._httpClient.post<Mercaderia>(API_URL_MERCADERIAS, mercaderia).pipe(first());
  }

  private actualizar(mercaderia: Partial<Mercaderia>) {
    return this._httpClient.put<Mercaderia>(`${API_URL_MERCADERIAS}/${mercaderia._id}`, mercaderia).pipe(first());
  }

  eliminar(id: string) {
    return this._httpClient.delete(`${API_URL_MERCADERIAS}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this._httpClient.put<Mercaderia>(`${API_URL_MERCADERIAS}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: string): Observable<Mercaderia> {
    return this._httpClient.get<ApiResponse<Mercaderia>>(`${API_URL_MERCADERIAS}/${id}`)
      .pipe(
        map(response => response.data)  // Extraer la mercadería desde `response.data`
      );
  }

}
