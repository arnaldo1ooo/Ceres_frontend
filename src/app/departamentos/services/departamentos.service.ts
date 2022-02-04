import { Injectable } from '@angular/core';
import { Departamento } from '../model/departamento';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private readonly API = 'ceres/departamentos';

  constructor(private httpClient: HttpClient) { }

  listaAllDepartamentos() {
    return this.httpClient.get<Departamento[]>(this.API)
      .pipe(
        first(),
        delay(2000),
        tap(departamentos => console.log(departamentos))
      );
  }
}
