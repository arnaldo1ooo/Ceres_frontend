import { DepartamentoDTO } from "src/app/modulos/departamentos/model/dtos/departamentoDTO";
import { TipoMercaderia } from "../../enums/tipoMercaderia.enum";
import { CategoriaMercaderiaDTO } from "./categoria-mercaderiaDTO";

export interface MercaderiaDetalleDTO {
  _id?: number;
  descripcion: string;
  tipo: TipoMercaderia | null;
  departamentos: DepartamentoDTO[];
  situacion: string
  presentaEnReporte: boolean;
  categoria: CategoriaMercaderiaDTO | null;
  imagen: string | null;
}
