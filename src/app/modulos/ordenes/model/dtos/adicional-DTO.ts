import { MonedaDTO } from 'src/app/modulos/monedas/models/dtos/monedaDTO';
import { CategoriaMercaderiaDTO } from '../../../mercaderias/model/dtos/categoria-mercaderiaDTO';
export interface AdicionalDTO {
  id: number;
  tipoAdicional: string;
  descripcion: string;
  valor: number;
  moneda: MonedaDTO;
  categoriaMercaderia: CategoriaMercaderiaDTO;
}
