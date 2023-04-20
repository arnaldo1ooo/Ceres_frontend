import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalDateTime } from '@js-joda/core';
import { delay, first, Observable } from 'rxjs';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { MovimientoFiltroDTO } from '../model/dtos/movimientoFiltroDTO';
import { Movimiento } from '../model/movimiento';
import { API_URL_MOVIMIENTOS } from './../../../compartido/constantes/constantes';
import { FechaHelpersService } from './../../../compartido/services/fecha-helpers.service';
import { MovimientoListaDTO, Page } from './../model/dtos/movimientoListaDTO';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {


  constructor(private htppClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosMovimientosLista() {
    return this.htppClient.get<MovimientoListaDTO[]>(API_URL_MOVIMIENTOS)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos*/
      );
  }

  listarTodosMovimientosListaFiltro() {
    return this.htppClient.get<MovimientoListaDTO[]>(API_URL_MOVIMIENTOS + '/filtro')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

  listarTodosMovimientosListaFiltroPage(movimientoFiltro: MovimientoFiltroDTO, pageRequest: PageRequest): Observable<Page> {
    const fechaInicial: LocalDateTime = FechaHelpersService.asignarHoraAFechaLDT(
                                    FechaHelpersService.dateALocalDateTime(movimientoFiltro.fechaRangoInicialFinal
                                      .get('start')?.value), 0, 0, 0); //Asignamos hora 00:00:00
    const fechaFinal: LocalDateTime = FechaHelpersService.asignarHoraAFechaLDT(
                                          FechaHelpersService.dateALocalDateTime( movimientoFiltro.fechaRangoInicialFinal
                                           .get('end')?.value), 23, 59, 59); //Asignamos hora 23:59:59;

    return this.htppClient.get<Page>(API_URL_MOVIMIENTOS
      + '/filtroPage?' + `id=${movimientoFiltro.id}`
                       + `&idTipo=${movimientoFiltro.idTipo}`
                       + `&nombreApellidoEntidad=${movimientoFiltro.nombreApellidoEntidad}`
                       + `&fechaInicial=${fechaInicial}`
                       + `&fechaFinal=${fechaFinal}`
                       + `&idDepartamento=${HelpersService.idTodosReturnVacio(movimientoFiltro.idDepartamento)}`
                       + `&keySituacion=${HelpersService.idTodosReturnVacio(movimientoFiltro.keySituacion)}`
      + `&page=${pageRequest.pagina}&size=${pageRequest.tamanho}&sort=${pageRequest.ordenarPor},${pageRequest.orden}`);
  }

  guardar(movimiento: Partial<Movimiento>) { //Se usa Partial cuando se espera que no reciba todos los datos de la entidad
    if (movimiento._id) {
      return this.actualizar(movimiento);
    }

    return this.crear(movimiento);
  }

  private crear(movimiento: Partial<Movimiento>) {
    return this.htppClient.post<Movimiento>(API_URL_MOVIMIENTOS, movimiento).pipe(first());
  }

  private actualizar(movimiento: Partial<Movimiento>) {
    return this.htppClient.put<Movimiento>(`${API_URL_MOVIMIENTOS}/${movimiento._id}`, movimiento).pipe(first());
  }

  eliminar(id: string) {
    return this.htppClient.delete(`${API_URL_MOVIMIENTOS}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this.htppClient.put<MovimientoListaDTO>(`${API_URL_MOVIMIENTOS}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: string) {
    return this.htppClient.get<Movimiento>(`${API_URL_MOVIMIENTOS}/${id}`);
  }
}

