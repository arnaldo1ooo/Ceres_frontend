import { Sucursal } from "src/app/modulos/sucursales/model/sucursal.model";

export interface DepartamentoDetalleDTO {
  _id: number;
  descripcion: string;
  sucursal: Sucursal;
  situacion: string;
}
