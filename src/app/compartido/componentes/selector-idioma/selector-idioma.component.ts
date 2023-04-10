import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { COD_ESPANHOL, COD_PORTUGUES } from '../../constantes/constantes';

@Component({
  selector: 'app-selector-idioma',
  templateUrl: './selector-idioma.component.html',
  styleUrls: ['./selector-idioma.component.scss']
})

export class SelectorIdiomaComponent implements OnInit {

  idiomasDisponibles: Idioma[] = [];
  idiomaSeleccionado!: Idioma;

  constructor(private _transLocoService: TranslocoService) {
  }

  ngOnInit(): void {

    this.idiomasDisponibles = [
      { key: COD_ESPANHOL,  descripcion: 'ESPAÑOL' },  //descripcion estaria en el json
      { key: COD_PORTUGUES, descripcion: 'PORTUGUÉS' }
    ];

    this.idiomaSeleccionado = this.idiomasDisponibles.find(idioma =>
              idioma.key === HelpersService.obtenerItemDelStorage('key-idioma'))
                || this.idiomasDisponibles[0];

    this.cambiarIdioma();
  }

  cambiarIdioma() {
    HelpersService.salvarItemEnStorage('key-idioma', this.idiomaSeleccionado.key);
    this._transLocoService.setActiveLang(this.idiomaSeleccionado.key); // cambia el idioma activo en Transloco
  }

}


//Model de Idioma
export interface Idioma {
  key: string;
  descripcion: string;
}
