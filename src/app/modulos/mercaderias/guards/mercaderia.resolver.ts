import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Mercaderia } from '../model/mercaderia.model';
import { MercaderiasService } from '../services/mercaderias.service';

//Un resolver se ejecuta al clickar en un boton y antes de que cargue el enlace de la misma

@Injectable({
  providedIn: 'root'
})
export class MercaderiaResolver implements Resolve<Mercaderia> {

  constructor(private mercaderiasService: MercaderiasService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mercaderia> {
    if(route.params && route.params['id']) {  //Si ruta tiene parametros y existe parametro id
      return this.mercaderiasService.cargarPorId(route.params['id']);
    }

    return of({ _id: '', descripcion: '', tipo: '', departamentos: [], situacion: '' });
  }
}
