import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { Sucursal } from '../model/sucursal.model';
import { ApiEndpointsService } from 'src/app/compartido/services/api-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  constructor(
    private _httpClient: HttpClient,
    private _apiEndPointsService: ApiEndpointsService) { } //El httpClient permite la conexion con el backend

  listarTodosSucursales() {
    return this._httpClient.get<Sucursal[]>(this._apiEndPointsService.API_URL_SUCURSALES)
      .pipe(
        first(),
        delay(100)
           //tap(sucursales => console.log(sucursales)) */         //Tap ejecuta la accion para todos, Imprimir los resultados
      );
  }
}
