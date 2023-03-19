import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { MercaderiaFiltro } from './../model/mercaderiaFiltro';
import { Page } from './../model/mercaderia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';

import { Mercaderia } from '../model/mercaderia';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';

@Injectable({
  providedIn: 'root'
})
export class MercaderiasService {

  private readonly API = 'ceres-api/mercaderias';

  constructor(private htppClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosMercaderias() {
    return this.htppClient.get<Mercaderia[]>(this.API)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos*/
      );
  }

  listarTodosMercaderiasFiltro() {
    return this.htppClient.get<Mercaderia[]>(this.API + '/filtro')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

  listarTodosMercaderiasFiltroPage(mercaderiaFiltro: MercaderiaFiltro, pageRequest: PageRequest): Observable<Page> {
    return this.htppClient.get<Page>(this.API
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
    return this.htppClient.post<Mercaderia>(this.API, mercaderia).pipe(first());
  }

  private actualizar(mercaderia: Partial<Mercaderia>) {
    return this.htppClient.put<Mercaderia>(`${this.API}/${mercaderia._id}`, mercaderia).pipe(first());
  }

  eliminar(id: string) {
    return this.htppClient.delete(`${this.API}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this.htppClient.put<Mercaderia>(`${this.API}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: string) {
    return this.htppClient.get<Mercaderia>(`${this.API}/${id}`);
  }

}
