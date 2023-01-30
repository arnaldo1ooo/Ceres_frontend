import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Filial } from '../model/filial';
import { FilialesService } from '../services/filiales.service';

//Un resolver se ejecuta al clickar en un boton y antes de que cargue el enlace de la misma

@Injectable({
  providedIn: 'root'
})
export class FilialResolver implements Resolve<Filial> {

  constructor(private service: FilialesService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Filial>  {
    if(route.params && route.params['id']){  //Si ruta tiene parametros y existe parametro id
      return this.service.cargarPorId(route.params['id']);  //Devuelve la filial
    }

    return of({ _id: '', nombre: '', sucursal: '', situacion: '' }); //Devuelve una filial vacio
  }
}
