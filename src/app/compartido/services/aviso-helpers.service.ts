import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AvisoHelpersService {

  constructor(private _snackBar: MatSnackBar) { }

  public mostrarMensaje(mensaje:string, accion:string='', duracion:number=4000) {
    return this._snackBar.open(mensaje, accion, { duration: duracion });
  }

  public mostrarMensajeDatosInvalidosForm() {
    this.mostrarMensaje('Existen datos inválidos en el formulario', '', 4000);
  }
}
