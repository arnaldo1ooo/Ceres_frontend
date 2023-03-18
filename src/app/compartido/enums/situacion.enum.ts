export enum Situacion {
  ACTIVO = "A",
  INACTIVO = "I"
}

//Este metodo se listará al listar el enum con Object.values(Enum), utiliza .slice(0, -1) para removerlo
export namespace Situacion {
  export function getDescripcion(tipo: Situacion): string {
    switch (tipo) {
      case Situacion.ACTIVO:
        return "ACTIVO";
      case Situacion.INACTIVO:
        return "INACTIVO";
      default:
        return "";
    }
  }
}

