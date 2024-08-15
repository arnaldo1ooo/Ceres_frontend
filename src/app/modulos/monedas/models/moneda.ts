export class Moneda {
  _id: string = ''; //Valor por defecto
  descripcion: string | null = null;
  simbolo: string | null = null;
  cantidadDecimales: number | null = null;
  codigoIso: string | null = null;

  constructor() {

  }
}

export enum MonedaEnum {
  GUARANI = '1'
}
