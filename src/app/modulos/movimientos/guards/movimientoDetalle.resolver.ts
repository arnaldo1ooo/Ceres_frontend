import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { MovimientoDetalleDTO } from '../model/dtos/movimientoDetalleDTO';
import { MovimientosService } from '../services/movimientos.service';

//Un resolver se ejecuta al clickar en un boton y antes de que cargue el enlace de la misma

@Injectable({
  providedIn: 'root'
})
export class MovimientoDetalleResolver implements Resolve<MovimientoDetalleDTO> {

  constructor(private _movimientosService: MovimientosService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovimientoDetalleDTO>  {
    if(route.params && route.params['id']){  //Si ruta tiene parametros y existe parametro id
      return this._movimientosService.cargarPorId(route.params['id']);
    }

    return of(new MovimientoDetalleDTO());
  }
}
