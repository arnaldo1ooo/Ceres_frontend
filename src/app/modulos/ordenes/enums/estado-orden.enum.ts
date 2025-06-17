export enum EstadoOrden {
  PENDIENTE = "P",
  EN_PREPARACION = "E",
  LISTO = "L",
  EN_ENTREGA = "D",
  ENTREGADO = "T",
  CANCELADO = "C"
}

export class EstadoOrdenUtils {
  public static getDescripcion(estadoOrden: EstadoOrden): string {
    switch (estadoOrden) {
      case EstadoOrden.PENDIENTE:
        return "Pendiente";
      case EstadoOrden.EN_PREPARACION:
        return "En preparación";
      case EstadoOrden.LISTO:
        return "Listo";
      case EstadoOrden.EN_ENTREGA:
        return "En entrega";
      case EstadoOrden.ENTREGADO:
        return "Entregado";
      case EstadoOrden.CANCELADO:
        return "Cancelado";
      default:
        return `Valor no reconocido: ${estadoOrden}`;
    }
  }

  public static getEstadoOrdenPorDescripcion(descripcion: string): EstadoOrden | string {
    const estadoEncontrado = Object.entries(EstadoOrden).find(
      ([, value]) => this.getDescripcion(value as EstadoOrden) === descripcion
    );

    return estadoEncontrado ? (estadoEncontrado[1] as EstadoOrden) : `Valor no reconocido: ${descripcion}`;
  }

  public static getEstadoOrdenPorKey(key: string): EstadoOrden {
    return Object.values(EstadoOrden).find(estado => estado === key)!;
  }

}

