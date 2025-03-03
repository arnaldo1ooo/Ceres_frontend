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
    const estadosOrden = Object.values(EstadoOrden);

    for (let i in estadosOrden) {
      if (this.getDescripcion(estadosOrden[i]) == descripcion) {
        return estadosOrden[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

