import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';
import { API_URL_FILIALES } from 'src/app/compartido/constantes/constantes';

import { Filial } from '../model/filial';

@Injectable({
  providedIn: 'root'
})
export class FilialesService {

  constructor(private htppClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosFiliales() {
    return this.htppClient.get<Filial[]>(API_URL_FILIALES)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos
          tap(filiales => console.log(filiales))*/          //Tap ejecuta la accion para todos, Imprimir los resultados
      );
  }

  listarTodosFilialesActivos() {
    return this.htppClient.get<Filial[]>(API_URL_FILIALES+'/activos')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
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
    return this.htppClient.post<Filial>(API_URL_FILIALES, filial).pipe(first());
  }

  private actualizar(filial: Partial<Filial>) {
    return this.htppClient.put<Filial>(`${API_URL_FILIALES}/${filial._id}`, filial).pipe(first());
  }

  eliminar(id: string) {
    return this.htppClient.delete(`${API_URL_FILIALES}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this.htppClient.put<Filial>(`${API_URL_FILIALES}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: string) {
    return this.htppClient.get<Filial>(`${API_URL_FILIALES}/${id}`);
  }

}
