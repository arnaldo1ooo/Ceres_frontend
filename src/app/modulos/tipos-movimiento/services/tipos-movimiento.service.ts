import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { API_URL_TIPOS_MOVIMIENTO } from './../../../compartido/constantes/constantes';
import { MovimientoListaDTO } from './../../movimientos/model/dtos/movimientoListaDTO';

@Injectable({
  providedIn: 'root'
})
export class TiposMovimientoService {

  constructor(private htppClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosTiposMovimiento() {
    return this.htppClient.get<MovimientoListaDTO[]>(API_URL_TIPOS_MOVIMIENTO)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos*/
      );
  }
}
