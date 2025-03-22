import { DepartamentoDTO } from "src/app/modulos/departamentos/model/dtos/departamentoDTO";
import { TipoMercaderia } from "../../enums/tipoMercaderia.enum";

export interface MercaderiaDTO {
  _id?: number;
  descripcion: string;
  tipoMercaderia: TipoMercaderia;
  departamentos: DepartamentoDTO[];
  situacion: string
  presentaEnReporte: boolean;
}
