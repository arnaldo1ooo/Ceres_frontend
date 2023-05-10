import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { API_URL_MONEDAS } from './../../../compartido/constantes/constantes';
import { Moneda } from './../models/moneda';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  constructor(private htppClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosMonedas() {
    return this.htppClient.get<Moneda[]>(API_URL_MONEDAS)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos*/
      );
  }
}
