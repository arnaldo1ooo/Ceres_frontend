export enum SiNo {
  SI = "S",
  NO = "N"
}

export class SiNoUtils {
  public static getDescripcion(siNo: SiNo): string {
    switch (siNo) {
      case SiNo.SI:
        return "SI";
      case SiNo.NO:
        return "NO";
      default:
        return `Valor no reconocido: ${siNo}`;
    }
  }

  public static getSiNoPorDescripcion(descripcion: string): SiNo | string {
    const siNos = Object.values(SiNo);

    for (let i in siNos) {
      if (this.getDescripcion(siNos[i]) == descripcion) {
        return siNos[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

