import { Mercaderia } from '../../mercaderias/model/mercaderia';
import { Movimiento } from './movimiento';

export class ItemMovimiento {
  _id: string = '';
  movimiento: Movimiento | null = null;
  mercaderia: Mercaderia | null = null;
  cantidad: number = 0;
  valorUnitario: number = 0;
  observacion: string | null = null;

  constructor() {

  }
}
