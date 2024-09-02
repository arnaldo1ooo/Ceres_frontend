import { Situacion } from "src/app/compartido/enums/situacion.enum";
import { Sucursal } from "src/app/modulos/sucursales/model/sucursal.model";
import { ClaseEntidad } from "../../enums/clase-entidad.enum";
import { Municipio } from '../municipio.model';
import { TipoEntidad } from '../../enums/tipo-entidad.enum';

export interface EntidadDetalleDTO {
  _id: string;
  nombre: string;
  apellido: string;
  sucursal: Sucursal;
  municipio: Municipio;
  direccion: string;
  tipo: TipoEntidad;
  ci: string;
  ruc: string;
  email: string;
  fechaCreacion: string;
  observacion: string;
  situacion: Situacion;
  clases: ClaseEntidad[];
  celular: string;
}
