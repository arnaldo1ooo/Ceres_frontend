export enum EntradaSalida {
  ENTRADA = "E",
  SALIDA = "S"
}

export class EntradaSalidaUtils {
  public static getDescripcion(situacion: EntradaSalida): string {
    switch (situacion) {
      case EntradaSalida.ENTRADA:
        return "ENTRADA";
      case EntradaSalida.SALIDA:
        return "SALIDA";
      default:
        return `Valor no reconocido: ${situacion}`;
    }
  }

  public static getEntradaSalidaPorDescripcion(descripcion: string): EntradaSalida | string {
    const entradasSalidas = Object.values(EntradaSalida);

    for (let i in entradasSalidas) {
      if (this.getDescripcion(entradasSalidas[i]) == descripcion) {
        return entradasSalidas[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

