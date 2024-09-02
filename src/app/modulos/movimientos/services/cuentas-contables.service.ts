import { CuentaContableDTO } from './../model/dtos/cuentaContableDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_CUENTAS_CONTABLES } from 'src/app/compartido/constantes/constantes';
import { delay, first } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MovimientoCuentaContable } from '../model/movimientoCuentaContable';
import { Movimiento } from '../model/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class CuentasContablesService {

  constructor(private _httpClient: HttpClient,
    private _formBuilder: NonNullableFormBuilder) { } //El httpClient permite la conexion con el backend

  listarTodosCuentasContablesActivos() {
    return this._httpClient.get<CuentaContableDTO[]>(API_URL_CUENTAS_CONTABLES + '/activos')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

}
