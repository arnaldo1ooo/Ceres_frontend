import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { catchError, delay, first, map, Observable } from 'rxjs';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { ApiPageRequest } from 'src/app/compartido/interfaces/api-page-request';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { Sucursal } from '../../sucursales/model/sucursal.model';
import { TipoEntidad } from '../enums/tipo-entidad.enum';
import { EntidadFiltroDTO } from '../models/dtos/entidadFiltroDTO';
import { EntidadListaDTO } from '../models/dtos/entidadListaDTO';

import { Entidad } from '../models/entidad.model';
import { Municipio } from '../models/municipio.model';
import { API_URL_ENTIDADES } from './../../../compartido/constantes/constantes';
import { ClaseEntidad } from '../models/claseEntidad.model';
import { ApiPageResponse } from '../../../compartido/interfaces/api-page-response';
import { ApiResponse } from 'src/app/compartido/interfaces/api-response';
import { EntidadDetalleForm } from '../models/dtos/entidadDetalleForm';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  constructor(
    private _httpClient: HttpClient, //El httpClient permite la conexion con el backend
    private _formBuilder: NonNullableFormBuilder) { }

  listarTodosEntidades() {
    return this._httpClient.get<EntidadListaDTO[]>(API_URL_ENTIDADES)
      .pipe(
        first(),
        delay(100)
      );
  }

  listarClasesEntidades() {
    return this._httpClient.get<ApiResponse<ClaseEntidad[]>>(`${API_URL_ENTIDADES}/listarClasesEntidad`)
      .pipe(
        first(),
        delay(100),
        map(response => response.data)
      );
  }

  listarTodosEntidadesFiltroPage(entidadFiltro: EntidadFiltroDTO, apiPageRequest: ApiPageRequest): Observable<ApiPageResponse> {
    return this._httpClient.get<ApiPageResponse>(API_URL_ENTIDADES
      + '/filtroPage?'
      + `id=${HelpersService.isNuloRetornaVacio(entidadFiltro.id)}`
      + `&nombreApellido=${HelpersService.isNuloRetornaVacio(entidadFiltro.nombreApellido)}`
      + `&idsClase=${entidadFiltro.idsClase}`
      + `&idSucursal=${HelpersService.idTodosReturnVacio(entidadFiltro.idSucursal)}`
      + `&ciRuc=${HelpersService.isNuloRetornaVacio(entidadFiltro.ciRuc)}`
      + `&idSituacion=${HelpersService.idTodosReturnVacio(entidadFiltro.idSituacion)}`
      + `&page=${apiPageRequest.pagina}&size=${apiPageRequest.tamanho}&sort=${apiPageRequest.ordenarPor},${apiPageRequest.orden}`);
  }

  public listarEntidadesPorClases(idsClaseEntidad: string) {
    return this._httpClient.get<Entidad[]>(API_URL_ENTIDADES
      + '/filtrarPorClases?' + `idsClaseEntidad=${idsClaseEntidad}`)
      .pipe(
        first(),
        delay(100),
        catchError((error) => {
          // Aquí puedes realizar el tratamiento de errores según tus necesidades
          console.error('Ocurrió un error en la solicitud HTTP:', error);
          // Puedes lanzar un nuevo error o devolver un valor por defecto en caso de error
          return [] //Devuelve lista vacia
        })
      );
  }

  cargarPorId(id: string): Observable<Entidad> {
    return this._httpClient.get<ApiResponse<Entidad>>(`${API_URL_ENTIDADES}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  inactivar(id: string) {
    return this._httpClient.put<Entidad>(`${API_URL_ENTIDADES}/inactivar/${id}`, null).pipe(first());
  }

  public crearEntidadFormGroup(): FormGroup {
    return this._formBuilder.group({
      _id: new FormControl<string>(''),
      nombre: new FormControl<string>('', [Validators.required, Validators.maxLength(100)]),
      apellido: new FormControl<string>('', Validators.maxLength(50)),
      sucursal: new FormControl<Sucursal | null>(null, Validators.required),
      municipio: new FormControl<Municipio | null>(null, Validators.required),
      direccion: new FormControl<string>('', Validators.maxLength(255)),
      tipo: new FormControl<TipoEntidad | null>(null, Validators.required),
      ci: new FormControl<string>('', [Validators.required, Validators.maxLength(9)]),
      ruc: new FormControl<string>('', [Validators.maxLength(12)]),
      email: new FormControl<string>('', Validators.email),
      fechaCreacion: new FormControl<string>(''),
      observacion: new FormControl<string>('', [Validators.maxLength(500)]),
      situacion: new FormControl<Situacion | null>(null, Validators.required),
      clases: new FormControl<ClaseEntidad[]>([], [Validators.required]),
      celular: new FormControl<string>('', [Validators.maxLength(20)])
    })
  }

  guardar(entidad: Partial<Entidad>) { //Se usa Partial cuando se espera que no reciba todos los datos de la entidad
    if (entidad._id) {
      return this.actualizar(entidad);
    }

    return this.crear(entidad);
  }

  private crear(entidad: Partial<Entidad>) {
    return this._httpClient.post<Entidad>(API_URL_ENTIDADES, entidad).pipe(first());
  }

  private actualizar(entidad: Partial<Entidad>) {
    return this._httpClient.put<Entidad>(`${API_URL_ENTIDADES}/${entidad._id}`, entidad).pipe(first());
  }

}
