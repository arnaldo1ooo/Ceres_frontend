import { DepartamentoDTO } from "src/app/modulos/departamentos/model/dtos/departamentoDTO";
import { TipoMercaderia } from "../../enums/tipoMercaderia.enum";
import { CategoriaMercaderiaDTO } from "./categoria-mercaderiaDTO";
import { MercaderiaImagenDTO } from "src/app/modulos/departamentos/model/dtos/mercaderiaImagenDTO";

export interface MercaderiaListaDTO {
  _id?: number;
  descripcion: string;
  tipo: TipoMercaderia | null;
  departamentos: DepartamentoDTO[];
  situacion: string
  presentaEnReporte: boolean;
  categoria: CategoriaMercaderiaDTO | null;
  mercaderiaImagenes: MercaderiaImagenDTO[];
}
