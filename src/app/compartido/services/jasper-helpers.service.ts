import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JasperService {

  constructor() { }

  public static mostrarPdf(pdfBlob: Blob) {
    const blob = new Blob([pdfBlob], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url); // Liberar recursos después de abrir la ventana
  }
}
