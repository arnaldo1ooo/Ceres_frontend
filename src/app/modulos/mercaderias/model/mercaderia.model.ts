import { Departamento } from '../../departamentos/model/departamento.model';
import { CategoriaMercaderiaDTO } from './dtos/categoria-mercaderiaDTO';

export class Mercaderia {

  _id: string = '';
  descripcion: string | null = null;
  tipo: string | null = null;
  departamentos: Array<Departamento> = [];
  situacion: string | null = null;
  presentaEnReporte: boolean = true;
  categoria?: CategoriaMercaderiaDTO;
}
