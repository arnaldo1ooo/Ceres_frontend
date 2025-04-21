import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, map, Observable, of } from 'rxjs';
import { ApiPageRequest } from 'src/app/compartido/interfaces/api-page-request';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { MercaderiaFiltroDTO } from '../model/dtos/mercaderiaFiltroDTO';
import { Mercaderia } from '../model/mercaderia.model';
import { ApiPageResponse } from '../../../compartido/interfaces/api-page-response';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';
import { API_URL_CATEGORIAS_MERCADERIA, API_URL_IMAGEN_MERCADERIA, API_URL_MERCADERIAS } from 'src/app/compartido/constantes/constantes';
import { MercaderiaListaDTO } from '../model/dtos/mercaderiaListaDTO';
import { MercaderiaDetalleDTO } from '../model/dtos/mercaderiaDetalleDTO';
import { CategoriaMercaderiaDTO } from '../model/dtos/categoria-mercaderiaDTO';

@Injectable({
  providedIn: 'root'
})
export class MercaderiasService {

  constructor(
    private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosMercaderias() {
    return this._httpClient.get<MercaderiaListaDTO[]>(API_URL_MERCADERIAS)
      .pipe(
        first(),
        delay(100)
      );
  }

  listarTodosMercaderiasActivos(): Observable<MercaderiaListaDTO[]> {
    return this._httpClient.get<ApiResponse<MercaderiaListaDTO[]>>(API_URL_MERCADERIAS + '/activos')
      .pipe(
        first(),
        delay(100),
        map(response => response.data)
      );
  }

  listarTodosMercaderiasFiltro() {
    return this._httpClient.get<MercaderiaListaDTO[]>(API_URL_MERCADERIAS + '/filtro')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

  listarTodosMercaderiasFiltroPage(mercaderiaFiltro: MercaderiaFiltroDTO, apiPageRequest: ApiPageRequest): Observable<ApiPageResponse> {
    return this._httpClient.get<ApiPageResponse>(API_URL_MERCADERIAS
      + '/filtroPage?' + `id=${mercaderiaFiltro.id}`
      + `&descripcion=${mercaderiaFiltro.descripcion}`
      + `&idTipo=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idTipo)}`
      + `&idDepartamento=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idDepartamento)}`
      + `&idSituacion=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idSituacion)}`
      + `&page=${apiPageRequest.pagina}&size=${apiPageRequest.tamanho}&sort=${apiPageRequest.ordenarPor},${apiPageRequest.ordenamiento}`);
  }

  guardar(mercaderia: Partial<MercaderiaDetalleDTO>) { //Se usa Partial cuando se espera que no reciba todos los datos de la entidad
    if (mercaderia._id) {
      return this.actualizar(mercaderia);
    }

    return this.crear(mercaderia);
  }

  private crear(mercaderia: Partial<MercaderiaDetalleDTO>) {
    return this._httpClient.post<MercaderiaDetalleDTO>(API_URL_MERCADERIAS, mercaderia).pipe(first());
  }

  private actualizar(mercaderia: Partial<MercaderiaDetalleDTO>) {
    return this._httpClient.put<MercaderiaDetalleDTO>(`${API_URL_MERCADERIAS}/${mercaderia._id}`, mercaderia).pipe(first());
  }

  eliminar(id: string) {
    return this._httpClient.delete(`${API_URL_MERCADERIAS}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this._httpClient.put<MercaderiaListaDTO>(`${API_URL_MERCADERIAS}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: number): Observable<MercaderiaDetalleDTO> {
    return this._httpClient.get<ApiResponse<MercaderiaDetalleDTO>>(`${API_URL_MERCADERIAS}/${id}`)
      .pipe(
        map(response => response.data)  // Extraer la mercadería desde `response.data`
      );
  }

    listarTodosCategoriasMercaderia() {
      return this._httpClient.get<ApiResponse<CategoriaMercaderiaDTO[]>>(API_URL_CATEGORIAS_MERCADERIA)
        .pipe(
          map(response => response.data)
        );
    }

    cargarImagenMercaderia(id: number): Observable<string> {
      return this._httpClient.get<ApiResponse<string>>(`${API_URL_MERCADERIAS}/${id}${API_URL_IMAGEN_MERCADERIA}`)
        .pipe(
          map(response => response.data),
          catchError(error => {
            console.error('Error al cargar la imagen', error);
            return of('');
          })
        );
    }

}
