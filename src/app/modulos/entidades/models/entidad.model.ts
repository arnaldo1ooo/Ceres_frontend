import { Sucursal } from '../../sucursales/model/sucursal.model';
import { Situacion } from '../../../compartido/enums/situacion.enum';
import { ClaseEntidad } from '../enums/clase-entidad.enum';
import { TipoEntidad } from '../enums/tipo-entidad.enum';

export class Entidad {

  _id: string | null = null;;
  nombre: string | null = null;
  apellido: string | null = null;
  sucursal: Sucursal  = new Sucursal();
  municipio: string | null = null;
  direccion: string | null = null;
  tipo: TipoEntidad | null = null;
  ci: string | null = null;
  ruc: string | null = null;
  email: string | null = null;
  fechaCreacion: string | null = null;
  observacion: string | null = null;
  situacion: Situacion | null = null;
  clases: ClaseEntidad[] = [];

  constructor() {

  }

}
