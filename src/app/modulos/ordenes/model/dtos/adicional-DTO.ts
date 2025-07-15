import { MonedaDTO } from 'src/app/modulos/monedas/models/dtos/monedaDTO';
import { CategoriaMercaderiaDTO } from '../../../mercaderias/model/dtos/categoria-mercaderiaDTO';
import { TipoAdicional } from '../../enums/tipo-adicional.enum';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
export interface AdicionalDTO {
  _id: number;
  tipoAdicional: TipoAdicional;
  descripcion: string;
  valor: number;
  moneda: MonedaDTO;
  categoriaMercaderia: CategoriaMercaderiaDTO;
  situacion: Situacion;
}
