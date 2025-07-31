export enum TipoAdicional {
  TAMANHO = 'T',
  BORDE = 'B',
  SABOR = 'S',
  EXTRA = 'E'

}

export class TipoAdicionalUtils {
  public static getDescripcion(tipoAdicional: TipoAdicional): string {
    switch (tipoAdicional) {
      case TipoAdicional.TAMANHO:
        return "Tamaño";
      case TipoAdicional.BORDE:
        return "Borde";
      case TipoAdicional.SABOR:
        return "Sabores";
      default:
        return `Valor no reconocido: ${tipoAdicional}`;
    }
  }

  public static getTipoAdicPorDescripcion(descripcion: string): TipoAdicional | string {
    const tiposAdic = Object.values(TipoAdicional);

    for (let i in tiposAdic) {
      if (this.getDescripcion(tiposAdic[i]) == descripcion) {
        return tiposAdic[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }

  public static isSeleccionMultiple(tipoAdicional: TipoAdicional): boolean {
    switch (tipoAdicional) {
      case TipoAdicional.TAMANHO:
        return false;
      case TipoAdicional.BORDE:
        return false;
      case TipoAdicional.SABOR:
        return true;
      default:
        return false;
    }
  }

  //si es true, significa que el tipo de adicional debe sumar una sola vez, ej: Tipo Sabores,
  // al seleccionar un sabor 5000gs, sumará solo ese valor, los demas sabores irán con valor 0
  public static isSumaUnica(tipoAdicional: TipoAdicional): boolean {
    switch (tipoAdicional) {
      case TipoAdicional.TAMANHO:
        return false;
      case TipoAdicional.BORDE:
        return false;
      case TipoAdicional.SABOR:
        return true;
      default:
        return false;
    }
  }

}

