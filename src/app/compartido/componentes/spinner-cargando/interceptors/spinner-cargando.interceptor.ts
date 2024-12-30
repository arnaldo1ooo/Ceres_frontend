import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from 'rxjs';
import { SpinnerCargandoService } from '../services/spinner-cargando.service';
import { ConfigService } from "src/app/compartido/services/config.service";
import { API_NOMBRE } from "src/app/compartido/constantes/constantes";

@Injectable()
export class SpinnerCargandoInterceptor implements HttpInterceptor {

  constructor(
    private _spinnerCargandoService: SpinnerCargandoService,
    private _configService: ConfigService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._spinnerCargandoService.mostrarCargando();

    //Agrega la url del server caso no posea
    if (!request.url.startsWith('http') && !request.url.includes('assets')) {
      let requestModificado = request.clone({
        url: this._configService.apiUrlServer + API_NOMBRE + request.url
      });

      request = requestModificado;
    }

    return next.handle(request).pipe(
      finalize(() => this._spinnerCargandoService.ocultarCargando())  //Ocultar spinner una vez finalizado requisicion http
    );
  }

}
