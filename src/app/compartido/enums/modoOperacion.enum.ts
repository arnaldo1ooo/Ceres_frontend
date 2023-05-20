export enum ModoOperacion {
  MODO_NUEVO = "1",
  MODO_EDITAR = "2",
  MODO_VISUALIZAR = "3"
}

export class ModoOperacionUtils {
  public static getDescripcion(modoOperacion: ModoOperacion): string {
    switch (modoOperacion) {
      case ModoOperacion.MODO_NUEVO:
        return "NUEVO";
      case ModoOperacion.MODO_EDITAR:
        return "EDITAR";
        case ModoOperacion.MODO_VISUALIZAR:
          return "VISUALIZAR";
      default:
        return `Valor no reconocido: ${modoOperacion}`;
    }
  }

  public static getModoOperacionPorDescripcion(descripcion: string): ModoOperacion | string {
    const modosOperacion = Object.values(ModoOperacion);

    for (let i in modosOperacion) {
      if (this.getDescripcion(modosOperacion[i]) == descripcion) {
        return modosOperacion[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

