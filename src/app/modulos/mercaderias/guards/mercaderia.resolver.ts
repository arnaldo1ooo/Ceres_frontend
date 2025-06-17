import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Mercaderia } from '../model/mercaderia.model';
import { MercaderiasService } from '../services/mercaderias.service';
import { MercaderiaDetalleDTO } from '../model/dtos/mercaderiaDetalleDTO';

//Un resolver se ejecuta al clickar en un boton y antes de que cargue el enlace de la misma

@Injectable({
  providedIn: 'root'
})
export class MercaderiaResolver implements Resolve<MercaderiaDetalleDTO> {

  constructor(private mercaderiasService: MercaderiasService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MercaderiaDetalleDTO> {
    if(route.params && route.params['id']) {  //Si ruta tiene parametros y existe parametro id
      return this.mercaderiasService.cargarPorId(route.params['id']);
    }

    return of({ _id: 0, descripcion: '', tipo: null, departamentos: [], situacion: '', presentaEnReporte: true, categoria: null, imagen: null, valor: 0, tipoIva: null });
  }
}
