import { Situacion } from "src/app/compartido/enums/situacion.enum";
import { Sucursal } from "src/app/modulos/sucursales/model/sucursal.model";
import { ClaseEntidad } from "../../enums/clase-entidad.enum";

export interface EntidadDetalleDTO {
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
  clases: ClaseEntidad[];
}
