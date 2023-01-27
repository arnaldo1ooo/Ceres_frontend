import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';

import { Filial } from '../model/filial';

@Injectable({
  providedIn: 'root'
})
export class FilialesService {

  private readonly API = 'ceres-api/filiales';

  constructor(private htppClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosFiliales() {
    return this.htppClient.get<Filial[]>(this.API)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos
          tap(filiales => console.log(filiales))*/          //Tap ejecuta la accion para todos, Imprimir los resultados
      );
  }

  guardar(filial: Partial<Filial>) { //Se usa Partial cuando se espera que no reciba todos los datos de Filial
    if (filial._id) {
      //console.log('Filial modificado!');
      return this.actualizar(filial);
    }

    //console.log('Filial creado!');
    return this.crear(filial);
  }

  private crear(filial: Partial<Filial>) {
    return this.htppClient.post<Filial>(this.API, filial).pipe(first());
  }

  private actualizar(filial: Partial<Filial>) {
    return this.htppClient.put<Filial>(`${this.API}/${filial._id}`, filial).pipe(first());
  }

  eliminar(id: string) {
    return this.htppClient.delete(`${this.API}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this.htppClient.put<Filial>(`${this.API}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: string) {
    return this.htppClient.get<Filial>(`${this.API}/${id}`);
  }

}
