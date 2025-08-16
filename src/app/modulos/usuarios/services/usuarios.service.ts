import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../model/dtos/usuarioDTO';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL_USUARIO_POR_NOMBRE } from 'src/app/compartido/constantes/constantes';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public async buscarPorNombreUsuario(nombreUsuario: string | null): Promise<UsuarioDTO> {
    try {
      const respuesta = await firstValueFrom(
        this._httpClient.get<ApiResponse<UsuarioDTO>>(
          API_URL_USUARIO_POR_NOMBRE,
          { params: { nombreUsuario: nombreUsuario ?? '' } } // asegura que no sea null
        )
      );

      return respuesta.data;
    } catch (error) {
      console.error(`Error al consultar usuario por nombre "${nombreUsuario}":`, error);
      throw error; // se relanza para que lo capture el caller
    }
  }
}
