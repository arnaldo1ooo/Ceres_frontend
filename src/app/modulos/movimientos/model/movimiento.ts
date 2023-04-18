import { Entidad } from './../../entidades/models/entidad';
import { Situacion } from '../../../compartido/enums/situacion.enum';
import { Departamento } from '../../departamentos/model/departamento';
import { Moneda } from '../../monedas/models/moneda';
import { TipoMovimiento } from '../../tipos-movimiento/models/tipo-movimiento';
import { ItemMovimiento } from './item-movimiento';
export interface Movimiento {
  _id: string;
  tipo: TipoMovimiento;
  moneda: Moneda;
  entidad: Entidad;
  fechaEmision: Date;
  departamento: Departamento;
  compradorVendedor: Entidad;
  observacion: string;
  situacion: Situacion;
  items: ItemMovimiento[];
}
