import { Entidad } from '../../entidades/models/entidad.model';
import { Situacion } from '../../../compartido/enums/situacion.enum';
import { Departamento } from '../../departamentos/model/departamento.model';
import { Moneda } from '../../monedas/models/moneda';
import { TipoMovimiento } from '../../tipos-movimiento/models/tipo-movimiento';
import { ItemMovimiento } from './itemMovimiento';
import { MovimientoCuentaContable } from './movimientoCuentaContable';

export class Movimiento {
  _id: string | null = null;
  tipo: TipoMovimiento = new TipoMovimiento();
  moneda: Moneda = new Moneda();
  entidad: Entidad = new Entidad();
  fechaEmision: Date | null = null;;
  departamento: Departamento = new Departamento();
  compradorVendedor: Entidad = new Entidad();
  observacion: string | null = null;
  situacion: Situacion | null = null;
  items: ItemMovimiento[] = [];
  movimientoCuentasContables: MovimientoCuentaContable[] = [];

  constructor() {

  }
}
