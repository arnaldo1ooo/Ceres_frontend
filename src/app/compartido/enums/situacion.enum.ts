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
}

