import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdicionalDTO } from '../model/dtos/adicional-DTO';
import { Observable } from 'rxjs';
import { AdicionalItemDTO } from '../model/dtos/adicional-item-DTO';

@Injectable({
  providedIn: 'root'
})
export class AdicionalesService {

constructor(private http: HttpClient) {}

  listarAdicionalesPorCategoria(categoriaId: number): Observable<AdicionalDTO[]> {
    return this.http.get<AdicionalDTO[]>(`/api/adicionales/categoria/${categoriaId}`);
  }

  listarValoresDeAdicionales(ids: number[]): Observable<AdicionalItemDTO[]> {
    return this.http.post<AdicionalItemDTO[]>(`/api/adicionales/valores`, ids);
  }
}
