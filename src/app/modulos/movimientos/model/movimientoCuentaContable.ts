import { Movimiento } from "./movimiento";
import { CuentaContableDTO } from './dtos/cuentaContableDTO';


export class MovimientoCuentaContable {
  _id: MovimientoCuentaContablePK = new MovimientoCuentaContablePK(new Movimiento(), new CuentaContableDTO);
  valor: number = 0; // Si el tipo es BigDecimal, se representa como number en TypeScript

  constructor() {

  }
}

export class MovimientoCuentaContablePK {
  movimiento: Movimiento;
  cuentaContable: CuentaContableDTO;

  constructor(movimiento: Movimiento, cuentaContable: CuentaContableDTO) {
    this.movimiento = movimiento;
    this.cuentaContable = cuentaContable;
  }
}
