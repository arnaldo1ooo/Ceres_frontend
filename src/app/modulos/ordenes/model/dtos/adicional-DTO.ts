import { MonedaDTO } from 'src/app/modulos/monedas/models/dtos/monedaDTO';
import { CategoriaMercaderiaDTO } from '../../../mercaderias/model/dtos/categoria-mercaderiaDTO';
export interface AdicionalDTO {
  id: number;
  tipo: string;
  descripcion: string;
  valor: number[];
  moneda: MonedaDTO;
  categoria: CategoriaMercaderiaDTO;
}
