import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { Departamento } from '../model/departamento.model';
import { DepartamentoListaDTO } from './../model/dtos/departamentoListaDTO';
import { ApiEndpointsService } from 'src/app/compartido/services/api-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(
    private _httpClient: HttpClient,
    private _apiEndPointsService: ApiEndpointsService) { } //El httpClient permite la conexion con el backend

  listarTodosDepartamentos() {
    return this._httpClient.get<DepartamentoListaDTO[]>(this._apiEndPointsService.API_URL_DEPARTAMENTOS)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos
          tap(departamentos => console.log(departamentos))*/          //Tap ejecuta la accion para todos, Imprimir los resultados
      );
  }

  listarTodosDepartamentosActivos() {
    return this._httpClient.get<DepartamentoListaDTO[]>(this._apiEndPointsService.API_URL_DEPARTAMENTOS + '/activos')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

  listarTodosPorSucursal(idSucursal: string) {
    return this._httpClient.get<DepartamentoListaDTO[]>(this._apiEndPointsService.API_URL_DEPARTAMENTOS + '/filtrarPorSucursal?' + `idSucursal=${idSucursal}`)
    .pipe(
      first(),
      delay(100)
    );
  }

  guardar(departamento: Partial<Departamento>) { //Se usa Partial cuando se espera que no reciba todos los datos de Departamento
    if (departamento._id) {
      //console.log('Departamento modificado!');
      return this.actualizar(departamento);
    }

    //console.log('Departamento creado!');
    return this.crear(departamento);
  }

  private crear(departamento: Partial<Departamento>) {
    return this._httpClient.post<Departamento>(this._apiEndPointsService.API_URL_DEPARTAMENTOS, departamento).pipe(first());
  }

  private actualizar(departamento: Partial<Departamento>) {
    return this._httpClient.put<Departamento>(`${this._apiEndPointsService.API_URL_DEPARTAMENTOS}/${departamento._id}`, departamento).pipe(first());
  }

  eliminar(id: string) {
    return this._httpClient.delete(`${this._apiEndPointsService.API_URL_DEPARTAMENTOS}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this._httpClient.put<Departamento>(`${this._apiEndPointsService.API_URL_DEPARTAMENTOS}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: string) {
    return this._httpClient.get<Departamento>(`${this._apiEndPointsService.API_URL_DEPARTAMENTOS}/${id}`);
  }

}
