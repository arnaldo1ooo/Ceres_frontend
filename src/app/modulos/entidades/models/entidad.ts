import { Sucursal } from '../../sucursales/model/sucursal';
import { Situacion } from './../../../compartido/enums/situacion.enum';
export interface Entidad {

  _id: string;
  nombre: string;
  apellido: string;
  sucursal: Sucursal;
  municipio: string;
  direccion: string;
  tipo: string;
  ci: string;
  ruc: string;
  email: string;
  fechaCreacion: string;
  observacion: string;
  situacion: Situacion;

}
