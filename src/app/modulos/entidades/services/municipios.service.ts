import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, firstValueFrom, map } from 'rxjs';
import { Municipio } from '../models/municipio.model';
import { DepartamentoPolitico } from '../models/departamentoPolitico.model';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';
import { API_URL_MUNICIPIOS, API_URL_MUNICIPIOS_POR_DPTO_POLITICO } from 'src/app/compartido/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  constructor(
    private _httpClient: HttpClient) { }

  public listarTodosMunicipiosPorDptoPolitico(dptoPolitico: DepartamentoPolitico): Observable<Municipio[]> {
    return this._httpClient.get<ApiResponse<Municipio[]>>(API_URL_MUNICIPIOS_POR_DPTO_POLITICO + `?idDptoPolitico=${dptoPolitico._id}`)
      .pipe(
        first(),
        delay(100),
        map(response => response.data)
      );
  }

  public listarTodosMunicipios(): Observable<Municipio[]> {
    return this._httpClient.get<ApiResponse<Municipio[]>>(API_URL_MUNICIPIOS)
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
