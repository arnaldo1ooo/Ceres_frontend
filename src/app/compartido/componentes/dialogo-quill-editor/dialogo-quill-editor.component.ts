import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/*Este componente de diálogo utiliza el QuillEditor
para editar y guardar texto. Se le puede pasar un título de diálogo
y un valor inicial. Al cerrar el diálogo, devuelve el texto editado.*/

@Component({
  selector: 'app-dialogo-quill-editor',
  templateUrl: './dialogo-quill-editor.component.html',
  styleUrls: ['./dialogo-quill-editor.component.scss']
})
export class DialogoQuillEditorComponent {
  public dialogoTitulo: string = '';
  public texto: string = '';
  public altoEditor: number = 300;
  public modoLectura: boolean = false;
  public QuillHtmlContent: any;

  public QuillModulos = { //Barra herramientas Quill Editor
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ font: [] }],
      [{ color: [] }],
      [{ background: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }],
      [{ list: 'bullet' }],
      //['link', 'image', 'video'], ['clean']
    ]
  }

  constructor(
    public dialogRef: MatDialogRef<DialogoQuillEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string, textoInicial: string, modoLectura: boolean }) {

    this.dialogoTitulo = data.titulo;
    this.texto = data.textoInicial;
    this.modoLectura = data.modoLectura;
  }

  onGuardar(): void {
    this.dialogRef.close(this.texto);
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onQuillChangedEditor(event: any): void {
    if (event.html) {
      this.QuillHtmlContent = event.html;
    }
  }
}
