import { Injectable } from '@angular/core';
import {
  Resolve, RouterStateSnapshot, ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sucursal } from '../../sucursales/model/sucursal.model';
import { Orden } from '../model/orden';
import { OrdenDetalleDTO } from '../model/dtos/ordenDetalleDTO';
import { OrdenesService } from '../services/ordenes.service';
import { SiNo } from 'src/app/compartido/enums/siNo.enum';
import { EstadoOrden } from '../enums/estado-orden.enum';

//Un resolver se ejecuta al clickar en un boton y antes de que cargue el enlace de la misma

@Injectable({
  providedIn: 'root'
})
export class OrdenResolver implements Resolve<OrdenDetalleDTO> {

  constructor(private ordenesService: OrdenesService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrdenDetalleDTO> {
    if (route.params && route.params['id']) {
      return this.ordenesService.cargarPorId(route.params['id']);
    }

    return of({
      _id: 0,
      numero: '',
      entidad: {} as any,
      nombreApellidoEntidad: '',
      nombreApellidoOcasional: '',
      celularOcasional: '',
      fechaEmision: new Date(),
      departamento: {} as any,
      moneda: {} as any,
      usuario: {} as any,
      descuentoGlobal: 0,
      tipoEntrega: {} as any,
      notificado: SiNo.NO,
      motivoCancelacion: '',
      estado: EstadoOrden.PENDIENTE,
      numeroMesa: '',
      observacion: '',
      items: []
    });
  }
}
