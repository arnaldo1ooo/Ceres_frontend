import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})

export class AvisoHelpersService {

  constructor(private _snackBar: MatSnackBar) { }

  public mostrarMensaje(mensaje: string, nombreBoton: string = '', duracion: number = 4000) {
    return this._snackBar.open(
      mensaje,
      duracion == 0 ? 'OK' : nombreBoton,
      {
        duration: duracion,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
  }

    public mostrarMensajes(mensaje: string, apiResponse: ApiResponse<null>, duracion: number = 4000) {
      this.mostrarMensaje(mensaje + apiResponse.mensajes.join(', '), '', duracion);
    }

  public mostrarMensajeError(mensaje: string, err: HttpErrorResponse) {
    let mensajesError: string = err != null && err.error != null && err.error.mensajes != null
                                      ? err.error.mensajes.join(', ') : err.error.detail;
    mensajesError = mensaje + mensajesError;
    console.error(mensajesError);
    this.mostrarMensaje(mensajesError, 'OK', 0);
  }

  public mostrarMensajeDatosInvalidosForm() {
    this.mostrarMensaje('Existen datos inválidos en el formulario', '', 4000);
  }
}
