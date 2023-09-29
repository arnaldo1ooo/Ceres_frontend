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

  public static getOrdenPorDescripcion(descripcion: string): Orden | string {
    const ordenes = Object.values(Orden);

    for (let i in ordenes) {
      if (this.getDescripcion(ordenes[i]) == descripcion) {
        return ordenes[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }

}
