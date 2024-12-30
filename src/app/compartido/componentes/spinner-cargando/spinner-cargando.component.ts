import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerCargandoService } from './services/spinner-cargando.service';

@Component({
  selector: 'app-spinner-cargando',
  templateUrl: './spinner-cargando.component.html',
  styleUrls: ['./spinner-cargando.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerCargandoComponent {

  isCargando$ = this._spinnerCargandoService.isCargando$;

  constructor(
    private _spinnerCargandoService: SpinnerCargandoService
  ) { }

  ngOnInit(): void {

  }

}
