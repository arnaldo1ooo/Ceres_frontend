import { Sucursal } from "src/app/modulos/sucursales/model/sucursal.model";

export interface DepartamentoListaDTO {
  _id: string;
  descripcion: string;
  sucursal: Sucursal;
  situacion: string;
}
