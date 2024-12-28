import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, firstValueFrom } from 'rxjs';

import { Moneda } from './../models/moneda';
import { API_URL_MONEDAS } from 'src/app/compartido/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  constructor(
    private _httpClient: HttpClient) { } //El httpClient permite la conexion con el backend

  listarTodosMonedas() {
    return this._httpClient.get<Moneda[]>(API_URL_MONEDAS)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)/*,                                //Espera de x segundos*/
      );
  }

    //Sincronica, usar await al llamar para esperar a que se complete el llamado para continuar la ejecucion
    public async cargarPorId(id: string): Promise<Moneda> {
      try {
        let respuesta = await firstValueFrom(this._httpClient.get<Moneda>(`${API_URL_MONEDAS}/${id}`));
        return respuesta;

      } catch (error) {
        throw error; // Relanzar el error para que pueda ser manejado en un nivel superior
      }
    }
}
