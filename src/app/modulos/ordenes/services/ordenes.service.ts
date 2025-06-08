import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, map, Observable, } from 'rxjs';
import { API_URL_ACTUALIZAR_PARCIAL_ORDEN, API_URL_ORDENES } from 'src/app/compartido/constantes/constantes';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';
import { OrdenListaDTO } from '../model/dtos/orden-lista-DTO';
import { OrdenDetalleDTO } from '../model/dtos/orden-detalle-DTO';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { EntidadDetalleDTO } from '../../entidades/models/dtos/entidadDetalleDTO';
import { DepartamentoDetalleDTO } from '../../departamentos/model/dtos/departamentoDetalleDTO';
import { MonedaDTO } from '../../monedas/models/dtos/monedaDTO';
import { UsuarioDTO } from '../../usuarios/model/dtos/usuarioDTO';
import { TipoEntregaOrden } from '../enums/tipoEntregaOrden.enum';
import { SiNo } from 'src/app/compartido/enums/si-no.enum';
import { EstadoOrden } from '../enums/estado-orden.enum';
import { OrdenItemDTO } from '../model/dtos/orden-item-DTO';
import { MercaderiaDTO } from '../../mercaderias/model/dtos/mercaderiaDTO';
import { AdicionalDTO } from '../model/dtos/adicional-DTO';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private apiUrl = '/ceres-api/ordenes'; // Ajusta según tu ruta real


  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: NonNullableFormBuilder) { }

  listarTodosOrdenes(): Observable<OrdenListaDTO[]> {
    return this._httpClient.get<ApiResponse<OrdenListaDTO[]>>(API_URL_ORDENES)
      .pipe(
        first(),
        map(response => response.data),
        delay(100)
      );
  }

  cargarPorId(id: number): Observable<OrdenDetalleDTO> {
    return this._httpClient.get<OrdenDetalleDTO>(`${this.apiUrl}/${id}`);
  }

  crear(orden: OrdenDetalleDTO): Observable<OrdenDetalleDTO> {
    return this._httpClient.post<OrdenDetalleDTO>(this.apiUrl, orden);
  }

  actualizar(id: number, orden: OrdenDetalleDTO): Observable<OrdenDetalleDTO> {
    return this._httpClient.put<OrdenDetalleDTO>(`${this.apiUrl}/${id}`, orden);
  }

  actualizarParcialOrden(id: number, ordenListaDTO: OrdenListaDTO): Observable<ApiResponse<OrdenListaDTO>> {
    return this._httpClient.put<ApiResponse<OrdenListaDTO>>(
      `${API_URL_ACTUALIZAR_PARCIAL_ORDEN}/${id}`,
      ordenListaDTO
    );
  }

  public crearOrdenDetalleFormGroup(): FormGroup {
    return this._formBuilder.group({
      _id: new FormControl<string>(''),
      numero: new FormControl<string>(''),
      entidad: new FormControl<EntidadDetalleDTO | null>(null, Validators.required),
      nombreApellidoOcasional: new FormControl<string>(''),
      celularOcasional: new FormControl<string>(''),
      fechaEmision: new FormControl<Date>(new Date()),
      departamento: new FormControl<DepartamentoDetalleDTO | null>(null, Validators.required),
      moneda: new FormControl<MonedaDTO | null>(null, Validators.required),
      usuario: new FormControl<UsuarioDTO | null>(null, Validators.required),
      descuentoGlobal: new FormControl<number>(0),
      tipoEntrega: new FormControl<TipoEntregaOrden | null>(null, Validators.required),
      notificado: new FormControl<SiNo>(SiNo.NO, Validators.required),
      motivoCancelacion: new FormControl<string>(''),
      estado: new FormControl<EstadoOrden>(EstadoOrden.PENDIENTE, Validators.required),
      numeroMesa: new FormControl<string>(''),
      observacion: new FormControl<string>(''),
      items: this._formBuilder.array([], Validators.required)
    })
  }

  public crearOrdenItemFormGroup(item: OrdenItemDTO = {
    mercaderia: {} as MercaderiaDTO,
    cantidad: 0,
    valorUnitario: 0,
    descuento: 0,
    numeroItem: 0,
    observacion: '',
    adicionales: []
  }): FormGroup {
    return this._formBuilder.group({
      _id: new FormControl<number | null>(item._id ?? null),
      mercaderia: new FormControl<MercaderiaDTO | null>(item.mercaderia, Validators.required),
      cantidad: new FormControl<number>(item.cantidad, [Validators.required, Validators.min(0.001)]),
      valorUnitario: new FormControl<number>(item.valorUnitario, [Validators.required, Validators.min(0)]),
      descuento: new FormControl<number>(item.descuento ?? 0),
      numeroItem: new FormControl<number>(item.numeroItem ?? 0),
      observacion: new FormControl<string>(item.observacion ?? ''),
      adicionales: new FormControl<AdicionalDTO[]>(item.adicionales ?? [])
    });
  }




}
