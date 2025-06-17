import { Mercaderia } from '../../mercaderias/model/mercaderia.model';
import { Movimiento } from './movimiento.model';

export class ItemMovimiento {
  _id: string = '';
  movimiento: Movimiento | null = null;
  mercaderia: Mercaderia = new Mercaderia();
  cantidad: number = 0;
  valorUnitario: number = 0;
  observacion: string | null = null;
  numItem: number | null = null;

  constructor() {

  }
}
