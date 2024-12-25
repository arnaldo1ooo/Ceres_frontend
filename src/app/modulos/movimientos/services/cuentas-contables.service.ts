import { CuentaContableDTO } from '../model/dtos/cuenta-contable-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';
import { NonNullableFormBuilder } from '@angular/forms';
import { ApiEndpointsService } from 'src/app/compartido/services/api-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class CuentasContablesService {

  constructor(
    private _httpClient: HttpClient,
    private _apiEndPointsService: ApiEndpointsService) { } //El httpClient permite la conexion con el backend

  listarTodosCuentasContablesActivos() {
    return this._httpClient.get<CuentaContableDTO[]>(this._apiEndPointsService.API_URL_CUENTAS_CONTABLES + '/activos')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

}
