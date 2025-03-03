export enum TipoEntregaOrden {
  EN_MOSTRADOR = "E",
  DELIVERY = "D",
  MESA = "M"
}

export class TipoEntregaOrdenUtils {
  public static getDescripcion(tipoEntrega: TipoEntregaOrden): string {
    switch (tipoEntrega) {
      case TipoEntregaOrden.EN_MOSTRADOR:
        return "En mostrador";
      case TipoEntregaOrden.DELIVERY:
        return "Delivery";
      case TipoEntregaOrden.MESA:
        return "Mesa";
      default:
        return `Valor no reconocido: ${tipoEntrega}`;
    }
  }

  public static getTipoEntregaPorDescripcion(descripcion: string): TipoEntregaOrden | string {
    const entries = Object.entries(TipoEntregaOrden);

    for (const [key, value] of entries) {
      if (this.getDescripcion(value as TipoEntregaOrden) === descripcion) {
        return value as TipoEntregaOrden;
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }

  public static listarTiposEntrega(): TipoEntregaOrden[] {
    return Object.values(TipoEntregaOrden);
  }

  public static isEnMostrador(tipo: TipoEntregaOrden): boolean {
    return tipo === TipoEntregaOrden.EN_MOSTRADOR;
  }

  public static isDelivery(tipo: TipoEntregaOrden): boolean {
    return tipo === TipoEntregaOrden.DELIVERY;
  }

  public static isMesa(tipo: TipoEntregaOrden): boolean {
    return tipo === TipoEntregaOrden.MESA;
  }
}

