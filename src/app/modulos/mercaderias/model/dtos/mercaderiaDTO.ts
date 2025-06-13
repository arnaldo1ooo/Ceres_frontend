import { DepartamentoDTO } from "src/app/modulos/departamentos/model/dtos/departamentoDTO";
import { TipoMercaderia } from "../../enums/tipoMercaderia.enum";
import { CategoriaMercaderiaDTO } from "./categoria-mercaderiaDTO";

export interface MercaderiaDTO {
  _id?: number;
  descripcion: string;
  tipo: TipoMercaderia | null;
  departamentos: DepartamentoDTO[];
  situacion: string
  presentaEnReporte: boolean;
  categoria: CategoriaMercaderiaDTO | null;
  imagen: string | null;
  valor: number;
  tipoIva: number | null; // 0 = Exenta, 5 = IVA 5%, 10 = IVA 10%
}
