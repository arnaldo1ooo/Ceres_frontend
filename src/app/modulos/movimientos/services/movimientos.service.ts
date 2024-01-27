import { MovimientoDetalleDTO } from './../model/dtos/movimientoDetalleDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalDateTime } from '@js-joda/core';
import { catchError, delay, first, Observable, throwError } from 'rxjs';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { HelpersService, RequerirAutocomplete } from 'src/app/compartido/services/helpers.service';

import { MovimientoFiltroDTO } from '../model/dtos/movimientoFiltroDTO';
import { Movimiento } from '../model/movimiento';
import {
  API_URL_MOVIMIENTOS,
  HORA_FINAL,
  HORA_INICIAL,
  MINUTO_FINAL,
  MINUTO_INICIAL,
  SEGUNDO_FINAL,
  SEGUNDO_INICIAL,
} from './../../../compartido/constantes/constantes';
import { FechaHelpersService } from './../../../compartido/services/fecha-helpers.service';
import { MovimientoListaDTO, Page } from './../model/dtos/movimientoListaDTO';
import { FormGroup, NonNullableFormBuilder, Validators, FormControl } from '@angular/forms';
import { ItemMovimiento } from '../model/itemMovimiento';
import { TipoMovimientoEnum } from '../../tipos-movimiento/enums/tipo-movimiento-enum.enum';
import { Moneda } from '../../monedas/models/moneda';
import { Entidad } from '../../entidades/models/entidad';
import { Departamento } from '../../departamentos/model/departamento';
import { Situacion } from '../../../compartido/enums/situacion.enum';
import { FormaPago } from '../enums/formaPago.enum';
import { Mercaderia } from '../../mercaderias/model/mercaderia';
import { MovimientoCuentaContable } from '../model/movimientoCuentaContable';
import { CuentaContableDTO } from '../model/dtos/cuentaContableDTO';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {


  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: NonNullableFormBuilder) { } //El httpClient permite la conexion con el backend

  listarTodosMovimientosLista() {
    return this._httpClient.get<MovimientoListaDTO[]>(API_URL_MOVIMIENTOS)
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100),
        catchError(() => {
          const error = new Error('Servidor no disponible');
          console.error('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
  }

  listarTodosMovimientosListaFiltro() {
    return this._httpClient.get<MovimientoListaDTO[]>(API_URL_MOVIMIENTOS + '/filtro')
      .pipe(                                        //Manipular datos
        first(),                                    //Ejecuta la accion al primer resultado
        delay(100)                             //Espera de x segundos
      );
  }

  public listarTodosMovimientosListaFiltroPage(movimientoFiltro: MovimientoFiltroDTO, pageRequest: PageRequest): Observable<Page> {

    return this._httpClient.get<Page>(API_URL_MOVIMIENTOS
      + '/filtroPage?'
      + `id=${movimientoFiltro.id}`
      + `&idTipo=${movimientoFiltro.idTipo}`
      + `&nombreApellidoEntidad=${movimientoFiltro.nombreApellidoEntidad}`
      + `&fechaInicial=${FechaHelpersService.formatearFecha(movimientoFiltro.fechaInicial)}`
      + `&fechaFinal=${FechaHelpersService.formatearFecha(
                  FechaHelpersService.asignarHoraAFechaDate(
                    movimientoFiltro.fechaFinal!, HORA_FINAL, MINUTO_FINAL, SEGUNDO_FINAL))}`
      + `&idDepartamento=${HelpersService.idTodosReturnVacio(movimientoFiltro.idDepartamento)}`
      + `&keySituacion=${HelpersService.idTodosReturnVacio(movimientoFiltro.keySituacion)}`
      + `&page=${pageRequest.pagina}&size=${pageRequest.tamanho}&sort=${pageRequest.ordenarPor},${pageRequest.orden}`);
  }

  guardar(movimiento: Partial<Movimiento>) { //Se usa Partial cuando se espera que no reciba todos los datos de la entidad
    if (movimiento._id == '' || movimiento._id != '0') {
      return this.actualizar(movimiento);
    }

    return this.crear(movimiento);
  }

  private crear(movimiento: Partial<Movimiento>) {
    return this._httpClient.post<Movimiento>(API_URL_MOVIMIENTOS, movimiento).pipe(first());
  }

  private actualizar(movimiento: Partial<Movimiento>) {
    return this._httpClient.put<Movimiento>(`${API_URL_MOVIMIENTOS}/${movimiento._id}`, movimiento).pipe(first());
  }

  eliminar(id: string) {
    return this._httpClient.delete(`${API_URL_MOVIMIENTOS}/${id}`).pipe(first());
  }

  inactivar(id: string) {
    return this._httpClient.put<MovimientoListaDTO>(`${API_URL_MOVIMIENTOS}/inactivar/${id}`, null).pipe(first());
  }

  cargarPorId(id: string) {
    return this._httpClient.get<MovimientoDetalleDTO>(`${API_URL_MOVIMIENTOS}/${id}`);
  }

  imprimirMovimientoA4Pdf(id: string) {
    return this._httpClient.get(`${API_URL_MOVIMIENTOS}/generarMovimientoA4PDF/${id}`, { responseType: 'blob' });
  }

  private convertirToLDTasignarHorasInicial(fechaInicial: Date): LocalDateTime | null {
    let fechaInicialLDT = FechaHelpersService.dateALocalDateTime(fechaInicial);

    return FechaHelpersService.asignarHoraAFechaLDT(
      fechaInicialLDT, HORA_INICIAL, MINUTO_INICIAL, SEGUNDO_INICIAL); //Asignamos hora 00:00:00
  }

  public crearMovimientoFormGroup(): FormGroup {
    return this._formBuilder.group({
      _id: new FormControl<string>(''),
      tipo: new FormControl<TipoMovimientoEnum | null>(null, Validators.required),
      moneda: new FormControl<Moneda | null>(null, Validators.required),
      entidad: new FormControl<Entidad | null>(null, [Validators.required, RequerirAutocomplete]),
      fechaEmision: new FormControl<LocalDateTime | null>(null, Validators.required),
      departamento: new FormControl<Departamento | null>(null, Validators.required),
      compradorVendedor: new FormControl<Entidad | null>(null, Validators.required),
      observacion: new FormControl<string>(''),
      situacion: new FormControl<Situacion | null>(null, Validators.required),
      items: this._formBuilder.array([], Validators.required),
      formaPago: new FormControl<FormaPago | null>(null, Validators.required),
      movimientoCuentasContables: this._formBuilder.array([], Validators.required),
    })
  }

  public crearItemFormGroup(itemMovimiento: ItemMovimiento = new ItemMovimiento()): FormGroup {
    return this._formBuilder.group({
      _id: new FormControl<string>(itemMovimiento._id),
      movimiento: new FormControl<Movimiento | null>(itemMovimiento.movimiento),
      mercaderia: new FormControl<Mercaderia | null>(itemMovimiento.mercaderia),
      cantidad: new FormControl<number>(itemMovimiento.cantidad),
      valorUnitario: new FormControl<number>(itemMovimiento.valorUnitario),
      observacion: new FormControl<string | null>(itemMovimiento.observacion)
    });
  }

  public crearMovimientoCuentaFormGroup(movimientoCuentaContable: MovimientoCuentaContable = new MovimientoCuentaContable()): FormGroup {
    return this._formBuilder.group({
      _id: this._formBuilder.group({
        movimiento: new FormControl<Movimiento>(movimientoCuentaContable._id.movimiento),
        cuentaContable: new FormControl<CuentaContableDTO>(movimientoCuentaContable._id.cuentaContable),
      }),
      valor: new FormControl<number>(movimientoCuentaContable.valor)
    });
  }

}

