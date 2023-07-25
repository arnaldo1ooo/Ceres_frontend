import { Movimiento } from './../movimiento';
import { CuentaContableDTO } from './cuentaContableDTO';

export class CuentaContableMovimientoDTO {
  _id: string = '';
  cuentaContableDTO: CuentaContableDTO = new CuentaContableDTO();
  movimiento: Movimiento = new Movimiento();
  valor: number = 0;

  constructor() {

  }
}
