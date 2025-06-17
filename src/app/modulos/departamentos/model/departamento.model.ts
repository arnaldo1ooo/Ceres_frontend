import { Sucursal } from "../../sucursales/model/sucursal.model";

export class Departamento {

  _id: number = 0;
  descripcion: string | null = null;
  sucursal: Sucursal = new Sucursal;
  situacion: string | null = null;

  constructor() {

  }
}
