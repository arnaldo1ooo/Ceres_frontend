export enum TipoMercaderia {
  PRODUCTO = "P",
  SERVICIO = "S"
}

//Este metodo se listará al listar el enum con Object.values(Enum), utiliza .slice(0, -1) para removerlo
export namespace TipoMercaderia {
  export function getDescripcion(tipoMercaderia: TipoMercaderia): string {
    switch (tipoMercaderia) {
      case TipoMercaderia.PRODUCTO:
        return "PRODUCTO";
      case TipoMercaderia.SERVICIO:
        return "SERVICIO";
      default:
        return "";
    }
  }
}
