import { TipoMovimiento } from './../../../tipos-movimiento/models/tipo-movimiento';
import { LocalDateTime } from '@js-joda/core';
import { Situacion } from './../../../../compartido/enums/situacion.enum';
import { Departamento } from './../../../departamentos/model/departamento';
export interface MovimientoListaDTO {
  _id: string;
  tipo: TipoMovimiento;
  nombreApellidoEntidad: string;
  fechaEmision: LocalDateTime;
  departamento: Departamento;
  total: number;
  situacion: Situacion;
}

export interface Page {
  content: Array<MovimientoListaDTO>
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort?: any;
  numberOfElements: number;
  first: boolean;
};
