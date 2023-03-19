export enum Orden {
  ASCENDENTE = "asc",
  DESCENDENTE = "desc"
}

export class OrdenUtils {
  public static getDescripcion(orden: Orden): string {
    switch (orden) {
      case Orden.ASCENDENTE:
        return "ASCENDENTE";
      case Orden.DESCENDENTE:
        return "DESCENDENTE";
      default:
        return `Valor no reconocido: ${orden}`;
    }
  }
}
