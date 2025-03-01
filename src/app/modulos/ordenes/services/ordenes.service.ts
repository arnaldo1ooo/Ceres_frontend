import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from '../model/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private apiUrl = '/ceres-api/ordenes'; // Ajusta según tu ruta real


  constructor(private http: HttpClient) { }

  // GET /ceres-api/ordenes
  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.apiUrl);
  }

  // GET /ceres-api/ordenes/{idOrden}
  getOrdenById(id: number): Observable<Orden> {
    return this.http.get<Orden>(`${this.apiUrl}/${id}`);
  }

  // POST /ceres-api/ordenes
  createOrden(orden: Orden): Observable<Orden> {
    return this.http.post<Orden>(this.apiUrl, orden);
  }

  // PUT /ceres-api/ordenes/{idOrden}
  updateOrden(id: number, orden: Orden): Observable<Orden> {
    return this.http.put<Orden>(`${this.apiUrl}/${id}`, orden);
  }

  // DELETE (si tuvieras un endpoint para borrar)
  deleteOrden(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
