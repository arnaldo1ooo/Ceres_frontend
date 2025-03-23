import { Mercaderia } from '../../mercaderias/model/mercaderia.model';
import { Orden } from './orden';

export class OrdenItem {
  _id: string = '';
  orden: Orden = new Orden();
  mercaderia: Mercaderia = new Mercaderia();
  cantidad: number = 0;
  valorUnitario: number = 0;
  descuento: number = 0;
  numItem: number | null = null;
  observacion: string | null = null;


  constructor() {

  }
}
