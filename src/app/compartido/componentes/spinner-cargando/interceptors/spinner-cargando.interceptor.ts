import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from 'rxjs';
import { SpinnerCargandoService } from '../services/spinner-cargando.service';

@Injectable()
export class SpinnerCargandoInterceptor implements HttpInterceptor {

  constructor(
    private _spinnerCargandoService: SpinnerCargandoService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._spinnerCargandoService.mostrarCargando();

    return next.handle(request).pipe(
      finalize(() => this._spinnerCargandoService.ocultarCargando())  //Ocultar spinner una vez finalizado requisicion http
    );
  }

}
