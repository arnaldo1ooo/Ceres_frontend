import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { COD_ESPANHOL, COD_PORTUGUES, COD_IDIOMA_DEFAULT } from '../../constantes/constantes';

@Component({
  selector: 'app-selector-idioma',
  templateUrl: './selector-idioma.component.html',
  styleUrls: ['./selector-idioma.component.scss']
})

export class SelectorIdiomaComponent implements OnInit {

  idiomasDisponibles: Idioma[] = [];

  idiomaSeleccionado!: Idioma; // Idioma default el primero


  constructor(private translocoService: TranslocoService) {
  }

  ngOnInit(): void {
    this.idiomasDisponibles = [
      { codigo: COD_ESPANHOL,  descripcion: 'idiomas_disponibles.es'  },  //descripcion estaria en el json
      { codigo: COD_PORTUGUES, descripcion: 'idiomas_disponibles.pt' }
    ];

    this.idiomaSeleccionado = this.idiomasDisponibles[0]; // Idioma default el primero

    this.cambiarIdioma();
  }

  cambiarIdioma() {
    this.translocoService.setActiveLang(this.idiomaSeleccionado.codigo); // cambia el idioma activo en Transloco
  }

  obtenerTraduccion(codigo: string) {
    return this.translocoService.translate(codigo);
  }
}


//Model de Idioma
export interface Idioma {
  codigo: string;
  descripcion: string;
}
