import { FormControl } from "@angular/forms";
import { Situacion } from "src/app/compartido/enums/situacion.enum";
import { Sucursal } from "src/app/modulos/sucursales/model/sucursal.model";
import { ClaseEntidad } from "../../enums/clase-entidad.enum";
import { TipoEntidad } from "../../enums/tipo-entidad.enum";
import { Municipio } from "../municipio.model";

export interface EntidadDetalleForm {
  _id: FormControl<string>;
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  sucursal: FormControl<Sucursal | null>;
  municipio: FormControl<Municipio | null>;
  direccion: FormControl<string>;
  tipo: FormControl<TipoEntidad | null>;
  ci: FormControl<string>;
  ruc: FormControl<string>;
  email: FormControl<string>;
  fechaCreacion: FormControl<string>;
  observacion: FormControl<string>;
  situacion: FormControl<Situacion | null>;
  clases: FormControl<ClaseEntidad[]>
  celular: FormControl<string>;
}
