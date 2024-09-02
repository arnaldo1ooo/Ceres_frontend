export enum TipoEntidad {
  FISICA = "F",
  JURIDICA = "J",
}

export class TipoEntidadUtils {
  public static getDescripcion(tipoEntidad: TipoEntidad): string {
    switch (tipoEntidad) {
      case TipoEntidad.FISICA:
        return "FISICA";
      case TipoEntidad.JURIDICA:
        return "JURIDICA";
      default:
        return `Valor no reconocido: ${tipoEntidad}`;
    }
  }

  public static getTipoEntidadPorDescripcion(descripcion: string): TipoEntidad | string {
    const tiposEntidad = Object.values(TipoEntidad);

    for (let i in tiposEntidad) {
      if (this.getDescripcion(tiposEntidad[i]) == descripcion) {
        return tiposEntidad[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

