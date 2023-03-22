export enum Situacion {
  ACTIVO = "A",
  INACTIVO = "I"
}

export class SituacionUtils {
  public static getDescripcion(situacion: Situacion): string {
    switch (situacion) {
      case Situacion.ACTIVO:
        return "ACTIVO";
      case Situacion.INACTIVO:
        return "INACTIVO";
      default:
        return `Valor no reconocido: ${situacion}`;
    }
  }

  public static getSituacionPorDescripcion(descripcion: string): Situacion | string {
    const situaciones = Object.values(Situacion);

    for (let i in situaciones) {
      if (this.getDescripcion(situaciones[i]) == descripcion) {
        return situaciones[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

