import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable } from 'rxjs';
import { API_URL_MERCADERIAS } from 'src/app/compartido/constantes/constantes';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { MercaderiaFiltroDTO } from '../model/dtos/mercaderiaFiltroDTO';
import { Mercaderia } from '../model/mercaderia';
import { Page } from './../model/mercaderia';

@Injectable({
  providedIn: 'root'
})
export class MercaderiasService {

  constructor(private htppClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosMercaderias() {
    return this.htppClient.get<Mercaderia[]>(API_URL_MERCADERIAS)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos*/
      );
  }

  listarTodosMercaderiasFiltro() {
    return this.htppClient.get<Mercaderia[]>(API_URL_MERCADERIAS + '/filtro')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

  listarTodosMercaderiasFiltroPage(mercaderiaFiltro: MercaderiaFiltroDTO, pageRequest: PageRequest): Observable<Page> {
    return this.htppClient.get<Page>(API_URL_MERCADERIAS
      + '/filtroPage?' + `id=${mercaderiaFiltro.id}`
                       + `&descripcion=${mercaderiaFiltro.descripcion}`
                       + `&idTipo=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idTipo)}`
                       + `&idSucursal=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idSucursal)}`
                       + `&idSituacion=${HelpersService.idTodosReturnVacio(mercaderiaFiltro.idSituacion)}`
      + `&page=${pageRequest.pagina}&size=${pageRequest.tamanho}&sort=${pageRequest.ordenarPor},${pageRequest.orden}`);
  }

  guardar(mercaderia: Partial<Mercaderia>) { //Se usa Partial cuando se espera que no reciba todos los datos de la entidad
    if (mercaderia._id) {
      return this.actualizar(mercaderia);
    }

    return this.crear(mercaderia);
  }

  private crear(mercaderia: Partial<Mercaderia>) {
    return this.htppClient.post<Mercaderia>(API_URL_MERCADERIAS, mercaderia).pipe(first());
  }

  private actualizar(mercaderia: Partial<Mercaderia>) {
    return this.htppClient.put<Mercaderia>(`${API_URL_MERCADERIAS}/${mercaderia._id}`, mercaderia).pipe(first());
  }

  eliminar(id: string) {
    return this.htppClient.delete(`${API_URL_MERCADERIAS}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this.htppClient.put<Mercaderia>(`${API_URL_MERCADERIAS}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: string) {
    return this.htppClient.get<Mercaderia>(`${API_URL_MERCADERIAS}/${id}`);
  }

}
