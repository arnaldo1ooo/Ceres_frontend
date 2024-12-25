import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, firstValueFrom, map } from 'rxjs';
import { Municipio } from '../models/municipio.model';
import { DepartamentoPolitico } from '../models/departamentoPolitico.model';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';
import { ApiEndpointsService } from 'src/app/compartido/services/api-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  constructor(
    private _httpClient: HttpClient,
    private _apiEndPointsService: ApiEndpointsService) { }

  public listarTodosMunicipiosPorDptoPolitico(dptoPolitico: DepartamentoPolitico): Observable<Municipio[]> {
    return this._httpClient.get<ApiResponse<Municipio[]>>(this._apiEndPointsService.API_URL_MUNICIPIOS_POR_DPTO_POLITICO + `?idDptoPolitico=${dptoPolitico._id}`)
      .pipe(
        first(),
        delay(100),
        map(response => response.data)
      );
  }

  public listarTodosMunicipios(): Observable<Municipio[]> {
    return this._httpClient.get<ApiResponse<Municipio[]>>(this._apiEndPointsService.API_URL_MUNICIPIOS)
      .pipe(
        first(),
        delay(100),
        map(response => response.data)
      );
  }

  public async listarTodosMunicipiosSync(): Promise<Municipio[]> { //Poner await en el metodo de llamada
    try {
      return firstValueFrom(this.listarTodosMunicipios());
    }
    catch (error) {
      throw error;
    }
  }
}
