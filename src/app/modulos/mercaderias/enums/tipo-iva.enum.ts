export enum TipoIva {
  EXENTA = "0",
  IVA_5 = "5",
  IVA_10 = "10"
}

export class TipoIvaUtils {
  public static getDescripcion(tipo: TipoIva | null): string {
    switch (tipo) {
      case TipoIva.EXENTA:
        return "Exenta";
      case TipoIva.IVA_5:
        return "IVA 5%";
      case TipoIva.IVA_10:
        return "IVA 10%";
      default:
        return `Valor no reconocido: ${tipo}`;
    }
  }

  public static getPorcentaje(tipo: TipoIva | null): number | string {
    switch (tipo) {
      case TipoIva.EXENTA:
        return 0;
      case TipoIva.IVA_5:
        return 5;
      case TipoIva.IVA_10:
        return 10;
      default:
        return `Valor no reconocido: ${tipo}`;
    }
  }

  public static getTipoPorDescripcion(descripcion: string): TipoIva | string {
    const valores = Object.values(TipoIva);

    for (let valor of valores) {
      if (this.getDescripcion(valor) === descripcion) {
        return valor;
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }

  public static listar(): { key: TipoIva, descripcion: string, porcentaje: number }[] {
    return Object.values(TipoIva).map(key => ({
      key,
      descripcion: this.getDescripcion(key),
      porcentaje: this.getPorcentaje(key) as number
    }));
  }
}
