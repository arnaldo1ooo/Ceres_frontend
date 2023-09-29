import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Departamento } from '../model/departamento';
import { DepartamentosService } from '../services/departamentos.service';

//Un resolver se ejecuta al clickar en un boton y antes de que cargue el enlace de la misma

@Injectable({
  providedIn: 'root'
})
export class DepartamentoResolver implements Resolve<Departamento> {

  constructor(private service: DepartamentosService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Departamento>  {
    if(route.params && route.params['id']){  //Si ruta tiene parametros y existe parametro id
      return this.service.cargarPorId(route.params['id']);  //Devuelve el departamento
    }

    return of({ _id: '', descripcion: '', sucursal: '', situacion: '' }); //Devuelve un departamento vacio
  }
}
