import { Mercaderia } from './../../mercaderias/model/mercaderia';
import { Movimiento } from './movimiento';

export class ItemMovimiento {
  _id: string = '';
  movimiento: Movimiento | null = null;
  mercaderia: Mercaderia | null = null;
  cantidad: Number | null = null;
  observacion: String | null = null;

  constructor() {

  }
}
