export enum TipoMercaderia {
  PRODUCTO = "P",
  SERVICIO = "S"
}

export class TipoMercaderiaUtils {
  public static getDescripcion(tipoMercaderia: TipoMercaderia): string {
    switch (tipoMercaderia) {
      case TipoMercaderia.PRODUCTO:
        return "PRODUCTO";
      case TipoMercaderia.SERVICIO:
        return "SERVICIO";
      default:
        return `Valor no reconocido: ${tipoMercaderia}`;
    }
  }
}
