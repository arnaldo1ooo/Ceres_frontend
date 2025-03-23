import { MercaderiaDTO } from "src/app/modulos/mercaderias/model/dtos/mercaderiaDTO";

export interface OrdenItemDTO {
  _id?: number;
  mercaderia: MercaderiaDTO;
  cantidad: number
  valorUnitario: number;
  descuento: number;
  numeroItem: number;
  observacion: string;
}
