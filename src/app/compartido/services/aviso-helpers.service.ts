import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AvisoHelpersService {

  constructor(private _snackBar: MatSnackBar) { }

  public mostrarMensaje(mensaje: string, accion: string, duracion: number) {
    return this._snackBar.open(mensaje, accion, { duration: duracion });
  }
}
