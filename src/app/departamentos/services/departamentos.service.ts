import { Injectable } from '@angular/core';
import { Departamento } from '../model/departamento';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private readonly API = '/assets/departamentos.json';

  constructor(private httpClient: HttpClient) { }

  listaAllDepartamentos() {
    return this.httpClient.get<Departamento[]>(this.API)
      .pipe(
        first(),
        tap(departamentos => console.log(departamentos))
      );
  }
}
