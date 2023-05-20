import { Sucursal } from '../../sucursales/model/sucursal';
import { Situacion } from './../../../compartido/enums/situacion.enum';

export class Entidad {

  _id: string = '';
  nombre: string | null = null;
  apellido: string | null = null;
  sucursal: Sucursal  = new Sucursal();
  municipio: string | null = null;
  direccion: string | null = null;
  tipo: string | null = null;
  ci: string | null = null;
  ruc: string | null = null;
  email: string | null = null;
  fechaCreacion: string | null = null;
  observacion: string | null = null;
  situacion: Situacion | null = null;

}
