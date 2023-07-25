

export class MovimientoCuentaContable {
  id: MovimientoCuentaContablePK;
  valor: number; // Si el tipo es BigDecimal, se representa como number en TypeScript

  constructor(id: MovimientoCuentaContablePK, valor: number) {
    this.id = id;
    this.valor = valor;
  }
}

export class MovimientoCuentaContablePK {
  movimientoId: number;
  cuentaContableId: number;

  constructor(movimientoId: number, cuentaContableId: number) {
    this.movimientoId = movimientoId;
    this.cuentaContableId = cuentaContableId;
  }
}
