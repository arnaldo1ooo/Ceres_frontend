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

  constructor(private _transLocoService: TranslocoService) {
  }

  ngOnInit(): void {
    let keyIdiomaAlmacenado = HelpersService.obtenerItemDelStorage('key-idioma');
    this.cambiarIdioma(keyIdiomaAlmacenado != null ? keyIdiomaAlmacenado : COD_ESPANHOL);
  }

  cambiarIdioma(keyIdioma: string) {
    HelpersService.salvarItemEnStorage('key-idioma', keyIdioma);
    this._transLocoService.setActiveLang(keyIdioma); // cambia el idioma activo en Transloco
  }

}


//Model de Idioma
export interface Idioma {
  key: string;
  descripcion: string;
}
