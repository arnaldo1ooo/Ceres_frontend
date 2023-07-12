export enum TipoMovimientoEnum {
  COMPRA_NORMAL = "1",
  VENTA_NORMAL = "2"
}

export class TipoMovimientoUtils {
  public static getDescripcion(tipoMovimiento: TipoMovimientoEnum): string {
    switch (tipoMovimiento) {
      case TipoMovimientoEnum.COMPRA_NORMAL:
        return "COMPRA NORMAL";
      case TipoMovimientoEnum.VENTA_NORMAL:
        return "VENTA NORMAL";
      default:
        return `Valor no reconocido: ${tipoMovimiento}`;
    }
  }

  public static getTipoMovimientoPorDescripcion(descripcion: string): TipoMovimientoEnum | string {
    const tiposMovimiento = Object.values(TipoMovimientoEnum);

    for (let i in tiposMovimiento) {
      if (this.getDescripcion(tiposMovimiento[i]) == descripcion) {
        return tiposMovimiento[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

