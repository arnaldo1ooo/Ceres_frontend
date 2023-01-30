import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Sucursal } from '../model/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  private readonly API = 'ceres-api/sucursales';

  constructor(private htppClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosSucursales() {
    return this.htppClient.get<Sucursal[]>(this.API)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos
           tap(sucursales => console.log(sucursales)) */         //Tap ejecuta la accion para todos, Imprimir los resultados
      );
  }
}
