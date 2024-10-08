import { Injectable } from '@angular/core';
import {
  Resolve, RouterStateSnapshot, ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sucursal } from '../../sucursales/model/sucursal.model';
import { Entidad } from '../models/entidad.model';
import { EntidadesService } from '../services/entidades.service';

//Un resolver se ejecuta al clickar en un boton y antes de que cargue el enlace de la misma

@Injectable({
  providedIn: 'root'
})
export class EntidadResolver implements Resolve<Entidad> {

  constructor(private entidadesservice: EntidadesService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Entidad> {
    if (route.params && route.params['id']) {
      return this.entidadesservice.cargarPorId(route.params['id']);
    }

    return of({
      _id: '', nombre: '', apellido: '', sucursal: new Sucursal(),  //Devuelve una entidad vacia
      municipio: '', direccion: '', tipo: null, ci: null, ruc: null,
      email: null, fechaCreacion: null, observacion: '', situacion: null, clases: []
    });
  }
}
