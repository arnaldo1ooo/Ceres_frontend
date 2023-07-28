export enum ClaseEntidad {
  ID_USUARIO = "1",
  ID_CLIENTE = "2",
  ID_FUNCIONARIO = "3",
  ID_PROVEEDOR = "4",
  ID_COMPRADOR = "5",
  ID_VENDEDOR = "6"
}

export class ClaseEntidadUtils {
  public static getDescripcion(claseEntidad: ClaseEntidad): string {
    switch (claseEntidad) {
      case ClaseEntidad.ID_USUARIO:
        return "USUARIO";
      case ClaseEntidad.ID_CLIENTE:
        return "CLIENTE";
      case ClaseEntidad.ID_FUNCIONARIO:
        return "FUNCIONARIO";
      case ClaseEntidad.ID_PROVEEDOR:
        return "PROVEEDOR";
      case ClaseEntidad.ID_COMPRADOR:
        return "COMPRADOR";
      case ClaseEntidad.ID_VENDEDOR:
        return "VENDEDOR";
      default:
        return `Valor no reconocido: ${claseEntidad}`;
    }
  }

  public static getClaseEntidadPorDescripcion(descripcion: string): ClaseEntidad | string {
    const clasesEntidad = Object.values(ClaseEntidad);

    for (let i in clasesEntidad) {
      if (this.getDescripcion(clasesEntidad[i]) == descripcion) {
        return clasesEntidad[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

