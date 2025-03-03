import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, map, Observable, of, throwError } from 'rxjs';
import { Orden } from '../model/orden';
import { API_URL_ORDENES } from 'src/app/compartido/constantes/constantes';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';
import { OrdenListaDTO } from '../model/dtos/ordenListaDTO';

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
  getOrdenById(id: number): Observable<Orden> {
    return this._httpClient.get<Orden>(`${this.apiUrl}/${id}`);
  }

  // POST /ceres-api/ordenes
  createOrden(orden: Orden): Observable<Orden> {
    return this._httpClient.post<Orden>(this.apiUrl, orden);
  }

  // PUT /ceres-api/ordenes/{idOrden}
  updateOrden(id: number, orden: Orden): Observable<Orden> {
    return this._httpClient.put<Orden>(`${this.apiUrl}/${id}`, orden);
  }

  // DELETE (si tuvieras un endpoint para borrar)
  deleteOrden(id: number): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
