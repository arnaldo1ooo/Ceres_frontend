import { LocalDateTime } from '@js-joda/core';
import { Moneda } from 'src/app/modulos/monedas/models/moneda';

import { Situacion } from '../../../../compartido/enums/situacion.enum';
import { TipoMovimiento } from '../../../tipos-movimiento/models/tipo-movimiento';
import { Departamento } from './../../../departamentos/model/departamento';
import { Entidad } from './../../../entidades/models/entidad';
import { ItemMovimiento } from './../item-movimiento';

export class MovimientoDetalleDTO {
  _id: string = '';  //Valor por defecto
  tipo: TipoMovimiento = new TipoMovimiento();
  moneda: Moneda = new Moneda();
  entidad: Entidad = new Entidad();
  fechaEmision: LocalDateTime | null = null; //Fecha actual por defecto
  departamento: Departamento = new Departamento();
  compradorVendedor : Entidad = new Entidad();
  observacion: string = '';
  situacion: Situacion | null = null;
  items: Array<ItemMovimiento> = [];

  constructor() {

  }
}
