import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdicionalDTO } from '../model/dtos/adicional-DTO';
import { Observable } from 'rxjs';
import { AdicionalItemDTO } from '../model/dtos/adicional-item-DTO';
import { API_URL_ADICIONALES_POR_CATEGORIA } from 'src/app/compartido/constantes/constantes';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AdicionalesService {

constructor(private http: HttpClient) {}

  listarAdicionalesPorCategoria(idCategoriaMerc: number): Observable<ApiResponse<AdicionalDTO[]>> {
    return this.http.get<ApiResponse<AdicionalDTO[]>>(`${API_URL_ADICIONALES_POR_CATEGORIA}/${idCategoriaMerc}`);
  }

  listarValoresDeAdicionales(ids: number[]): Observable<AdicionalItemDTO[]> {
    return this.http.post<AdicionalItemDTO[]>(`/api/adicionales/valores`, ids);
  }
}
