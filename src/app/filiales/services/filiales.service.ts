import { Injectable } from '@angular/core';
import { Filial } from '../model/filial';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilialesService {

  private readonly API = 'ceres/filiales';

  constructor(private httpClient: HttpClient) { }

  listaAllFiliales() {
    return this.httpClient.get<Filial[]>(this.API)
      .pipe(
        first(),
        delay(2000),
        tap(filiales => console.log(filiales))
      );
  }
}
