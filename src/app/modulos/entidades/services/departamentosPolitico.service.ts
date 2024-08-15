import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';
import { API_URL_DPTOS_POLITICO, API_URL_MUNICIPIOS, API_URL_SUCURSALES } from 'src/app/compartido/constantes/constantes';
import { DepartamentoPolitico } from '../models/departamentoPolitico.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosPoliticoService {

  constructor(private _httpClient: HttpClient) { }

  listarTodosDptosPolitico() {
    return this._httpClient.get<DepartamentoPolitico[]>(API_URL_DPTOS_POLITICO)
      .pipe(
        first(),
        delay(100)
      );
  }
}
