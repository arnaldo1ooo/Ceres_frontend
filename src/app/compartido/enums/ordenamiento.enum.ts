export enum Ordenamiento {
  ASCENDENTE = "asc",
  DESCENDENTE = "desc"
}

export class OrdenamientoUtils {
  public static getDescripcion(ordenamiento: Ordenamiento): string {
    switch (ordenamiento) {
      case Ordenamiento.ASCENDENTE:
        return "ASCENDENTE";
      case Ordenamiento.DESCENDENTE:
        return "DESCENDENTE";
      default:
        return `Valor no reconocido: ${ordenamiento}`;
    }
  }

  public static getOrdenPorDescripcion(descripcion: string): Ordenamiento | string {
    const ordenamientos = Object.values(Ordenamiento);

    for (let i in ordenamientos) {
      if (this.getDescripcion(ordenamientos[i]) == descripcion) {
        return ordenamientos[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }

}
