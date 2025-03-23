import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, map, Observable, } from 'rxjs';
import { API_URL_ACTUALIZAR_PARCIAL_ORDEN, API_URL_ORDENES } from 'src/app/compartido/constantes/constantes';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';
import { OrdenListaDTO } from '../model/dtos/orden-lista-DTO';
import { OrdenDetalleDTO } from '../model/dtos/orden-detalle-DTO';

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

  cargarPorId(id: number): Observable<OrdenDetalleDTO> {
    return this._httpClient.get<OrdenDetalleDTO>(`${this.apiUrl}/${id}`);
  }

  crear(orden: OrdenDetalleDTO): Observable<OrdenDetalleDTO> {
    return this._httpClient.post<OrdenDetalleDTO>(this.apiUrl, orden);
  }

  actualizar(id: number, orden: OrdenDetalleDTO): Observable<OrdenDetalleDTO> {
    return this._httpClient.put<OrdenDetalleDTO>(`${this.apiUrl}/${id}`, orden);
  }

  actualizarParcialOrden(id: number, ordenListaDTO: OrdenListaDTO): Observable<ApiResponse<OrdenListaDTO>> {
    return this._httpClient.put<ApiResponse<OrdenListaDTO>>(
      `${API_URL_ACTUALIZAR_PARCIAL_ORDEN}/${id}`,
      ordenListaDTO
    );
  }


}
