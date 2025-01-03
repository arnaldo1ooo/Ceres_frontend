import { CuentaContableDTO } from '../model/dtos/cuenta-contable-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';
import { API_URL_CUENTAS_CONTABLES } from 'src/app/compartido/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class CuentasContablesService {

  constructor(
    private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosCuentasContablesActivos() {
    return this._httpClient.get<CuentaContableDTO[]>(API_URL_CUENTAS_CONTABLES + '/activos')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

}
