import { Mercaderia } from './../../mercaderias/model/mercaderia';
import { Movimiento } from './movimiento';

export class ItemMovimiento {
  _id: string | null = null;;
  movimiento: Movimiento | null = null;
  mercaderia: Mercaderia | null = null;
  cantidad: Number = 0;
  valorUnitario: Number = 0;
  observacion: String | null = null;

  constructor() {

  }
}
