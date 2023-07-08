import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { COD_ESPANHOL } from '../../constantes/constantes';

@Component({
  selector: 'app-selector-idioma',
  templateUrl: './selector-idioma.component.html',
  styleUrls: ['./selector-idioma.component.scss']
})

export class SelectorIdiomaComponent implements OnInit {

  idiomaDefault: string = COD_ESPANHOL;

  constructor(private _transLocoService: TranslocoService) {
  }

  ngOnInit(): void {
    let keyIdiomaAlmacenado: string = HelpersService.obtenerItemDelStorage('key-idioma');
    this.cambiarIdioma(HelpersService.isNoNuloYNoVacioYNoUndefined(keyIdiomaAlmacenado) ? keyIdiomaAlmacenado : this.idiomaDefault);
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
