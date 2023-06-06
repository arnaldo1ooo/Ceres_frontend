export enum FormaPago {
  EFECTIVO = "E"
}

export class FormaPagoUtils {
  public static getDescripcion(formaPago: FormaPago): string {
    switch (formaPago) {
      case FormaPago.EFECTIVO:
        return "EFECTIVO";
      default:
        return `Valor no reconocido: ${formaPago}`;
    }
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

