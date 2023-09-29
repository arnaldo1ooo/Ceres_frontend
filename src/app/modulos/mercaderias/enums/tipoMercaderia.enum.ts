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

  public static getTipoMercaderiaPorDescripcion(descripcion: string): TipoMercaderia | string {
    const tiposMercaderia = Object.values(TipoMercaderia);

    for (let i in tiposMercaderia) {
      if (this.getDescripcion(tiposMercaderia[i]) == descripcion) {
        return tiposMercaderia[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }

}
