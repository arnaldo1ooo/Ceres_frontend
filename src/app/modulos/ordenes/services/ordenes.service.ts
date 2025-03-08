import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, map, Observable, of, throwError } from 'rxjs';
import { Orden } from '../model/orden';
import { API_URL_ACTUALIZAR_ESTADO_DE_ORDEN, API_URL_ORDENES } from 'src/app/compartido/constantes/constantes';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';
import { OrdenListaDTO } from '../model/dtos/ordenListaDTO';
import { EstadoOrden } from '../enums/estado-orden.enum';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private apiUrl = '/ceres-api/ordenes'; // Ajusta según tu ruta real


  constructor(private _httpClient: HttpClient) { }

  listarTodosOrdenes(): Observable<OrdenListaDTO[]> {
    return this._httpClient.get<ApiResponse<OrdenListaDTO[]>>(API_URL_ORDENES)
         .pipe(
           first(),
           map(response => response.data),
           delay(100)
         );
  }

  // GET /ceres-api/ordenes/{idOrden}
  buscarPorId(id: number): Observable<Orden> {
    return this._httpClient.get<Orden>(`${this.apiUrl}/${id}`);
  }

  // POST /ceres-api/ordenes
  crear(orden: Orden): Observable<Orden> {
    return this._httpClient.post<Orden>(this.apiUrl, orden);
  }

  actualizar(id: number, orden: Orden): Observable<Orden> {
    return this._httpClient.put<Orden>(`${this.apiUrl}/${id}`, orden);
  }

  // DELETE (si tuvieras un endpoint para borrar)
  deleteOrden(id: number): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}/${id}`);
  }

  actualizarEstadoDeOrden(id: number, estadoOrden: EstadoOrden): Observable<Orden> {
    return this._httpClient.put<Orden>(
      `${API_URL_ACTUALIZAR_ESTADO_DE_ORDEN}/${id}?idEstadoOrden=${estadoOrden}`,
      {}
    );
  }


}
