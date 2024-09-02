import { Departamento } from '../../departamentos/model/departamento.model';

export class Mercaderia {

  _id: string = '';
  descripcion: string | null = null;
  tipo: string | null = null;
  departamentos: Array<Departamento> = [];
  situacion: string | null = null;
}
