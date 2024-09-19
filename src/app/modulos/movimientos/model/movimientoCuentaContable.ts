import { CuentaContableDTO } from './dtos/cuenta-contable-dto';
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
