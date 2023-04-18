import { Mercaderia } from './../../mercaderias/model/mercaderia';
import { Movimiento } from './movimiento';

export interface ItemMovimiento {
  _id: string;
  movimiento: Movimiento;
  mercaderia: Mercaderia;
  cantidad: Number;
  observacion: String;
}
