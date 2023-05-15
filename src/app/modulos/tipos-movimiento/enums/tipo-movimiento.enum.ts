export enum TipoMovimiento {
  COMPRA_NORMAL = "1",
  VENTA_NORMAL = "2"
}

export class TipoMovimientoUtils {
  public static getDescripcion(tipoMovimiento: TipoMovimiento): string {
    switch (tipoMovimiento) {
      case TipoMovimiento.COMPRA_NORMAL:
        return "COMPRA NORMAL";
      case TipoMovimiento.VENTA_NORMAL:
        return "VENTA NORMAL";
      default:
        return `Valor no reconocido: ${tipoMovimiento}`;
    }
  }

  public static getTipoMovimientoPorDescripcion(descripcion: string): TipoMovimiento | string {
    const tiposMovimiento = Object.values(TipoMovimiento);

    for (let i in tiposMovimiento) {
      if (this.getDescripcion(tiposMovimiento[i]) == descripcion) {
        return tiposMovimiento[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

