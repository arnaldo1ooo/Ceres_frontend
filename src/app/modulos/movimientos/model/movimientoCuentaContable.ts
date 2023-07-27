import { Movimiento } from "./movimiento";
import { CuentaContableDTO } from './dtos/cuentaContableDTO';
import { MovimientoDetalleDTO } from './dtos/movimientoDetalleDTO';


export class MovimientoCuentaContable {
  _id: MovimientoCuentaContablePK = new MovimientoCuentaContablePK(new MovimientoDetalleDTO(), new CuentaContableDTO);
  valor: number = 0;

  constructor() {

  }
}

export class MovimientoCuentaContablePK {
  movimiento: MovimientoDetalleDTO;
  cuentaContable: CuentaContableDTO;

  constructor(movimiento: MovimientoDetalleDTO, cuentaContable: CuentaContableDTO) {
    this.movimiento = movimiento;
    this.cuentaContable = cuentaContable;
  }
}
