import { DepartamentoDTO } from "src/app/modulos/departamentos/model/dtos/departamentoDTO";
import { TipoMercaderia } from "../../enums/tipoMercaderia.enum";
import { CategoriaMercaderiaDTO } from "./categoria-mercaderiaDTO";
import { MercaderiaImagenDTO } from "src/app/modulos/departamentos/model/dtos/mercaderiaImagenDTO";

export interface MercaderiaDetalleDTO {
  _id?: number;
  descripcion: string;
  tipo: TipoMercaderia | null;
  departamentos: DepartamentoDTO[];
  situacion: string
  presentaEnReporte: boolean;
  categoria: CategoriaMercaderiaDTO | null;
  mercaderiaImagenes: MercaderiaImagenDTO[];
  valor: number;
  tipoIva: number | null; // 0 = Exenta, 5 = IVA 5%, 10 = IVA 10%
}
