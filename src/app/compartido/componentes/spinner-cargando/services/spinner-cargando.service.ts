import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerCargandoService {

  isCargando$ = new Subject<boolean>();

  constructor() { }

  public mostrarCargando(): void {
    this.isCargando$.next(true);
  }

  public ocultarCargando(): void {
    this.isCargando$.next(false);
  }

}
