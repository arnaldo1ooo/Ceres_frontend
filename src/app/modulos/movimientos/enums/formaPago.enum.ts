export enum FormaPago {
  EFECTIVO = "E",
  TRANSFERENCIA = "T",
  GIRO = "G"
}

export class FormaPagoUtils {
  public static getDescripcion(formaPago: FormaPago): string {
    switch (formaPago) {
      case FormaPago.EFECTIVO:
        return "EFECTIVO";
      case FormaPago.TRANSFERENCIA:
        return "TRANSFERENCIA";
      case FormaPago.GIRO:
        return "GIRO";
      default:
        return `Valor no reconocido: ${formaPago}`;
    }
  }

  public static getDescripcionByKey(key: string) {
    const formasPago = Object.values(FormaPago);

    for (let formaPago of formasPago) {
      if (formaPago == key) {
        return this.getDescripcion(formaPago);
      }
    }

    return `Key no reconocido: ${key}`;
  }

  public static getFormaPagoPorDescripcion(descripcion: string): FormaPago | string {
    const formasPago = Object.values(FormaPago);

    for (let i in formasPago) {
      if (this.getDescripcion(formasPago[i]) == descripcion) {
        return formasPago[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }

}

