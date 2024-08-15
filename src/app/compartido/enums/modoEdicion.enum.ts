export enum ModoEdicion {
  MODO_NUEVO = "1",
  MODO_EDITAR = "2",
  MODO_VISUALIZAR = "3"
}

export class ModoEdicionUtils {
  public static getDescripcion(modoEdicion: ModoEdicion): string {
    switch (modoEdicion) {
      case ModoEdicion.MODO_NUEVO:
        return "NUEVO";
      case ModoEdicion.MODO_EDITAR:
        return "EDITAR";
        case ModoEdicion.MODO_VISUALIZAR:
          return "VISUALIZAR";
      default:
        return `Valor no reconocido: ${modoEdicion}`;
    }
  }

  public static getModoEdicionPorDescripcion(descripcion: string): ModoEdicion | null {
    const modosEdicion = Object.values(ModoEdicion);

    for (let i in modosEdicion) {
      if (this.getDescripcion(modosEdicion[i]) == descripcion) {
        return modosEdicion[i];
      }
    }

    return null;
  }
}

