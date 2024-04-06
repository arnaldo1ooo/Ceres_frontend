import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AvisoHelpersService } from '../../services/aviso-helpers.service';
import { HelpersService } from '../../services/helpers.service';

/*Este componente de diálogo sirve para visualizar, editar y guardar texto.
Se le puede pasar un título de diálogo y un valor inicial. Al cerrar el diálogo, devuelve el texto editado.*/

@Component({
  selector: 'app-dialogo-ingresar-texto',
  templateUrl: './dialogo-ingresar-texto.component.html',
  styleUrls: ['./dialogo-ingresar-texto.component.scss']
})
export class DialogoIngresarTextoComponent {
  public dialogoTitulo: string = 'Titulo dialogo';
  public texto: string = 'Texto ejemplo';
  public isModoLectura: boolean = false;
  public cantidadMinLineas: number = 4;
  public cantidadMaxLineas: number = 5;
  public tamanhoMaximo: number = 50;

  constructor(
    private _avisoHelpersService: AvisoHelpersService,
    private _dialogRef: MatDialogRef<DialogoIngresarTextoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string, textoInicial: string, isModoLectura: boolean, tamanhoMaximo: number }) {

    this.dialogoTitulo = HelpersService.isNoNuloYNoVacioYNoUndefined(data.titulo) ? data.titulo : this.dialogoTitulo;
    this.texto = data.textoInicial;
    this.isModoLectura = HelpersService.isNoNuloYNoVacioYNoUndefined(data.isModoLectura) ? data.isModoLectura : this.isModoLectura;
    this.tamanhoMaximo = HelpersService.isNoNuloYNoVacioYNoUndefined(data.tamanhoMaximo) ? data.tamanhoMaximo : this.tamanhoMaximo;
  }

  onGuardar(): void {
    if (HelpersService.isNoNuloYNoVacioYNoUndefined(this.texto)) {
      this._dialogRef.close(this.texto);
    }
    else {
      this._avisoHelpersService.mostrarMensaje("Ingrese un texto!");
    }
  }

  onCancelar(): void {
    this._dialogRef.close();
  }
}
