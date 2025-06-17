import { AdicionalDTO } from "src/app/modulos/ordenes/model/dtos/adicional-DTO";

export interface CategoriaMercaderiaDTO {
  _id?: number;
  descripcion: string;
  adicionales: AdicionalDTO[];
}
