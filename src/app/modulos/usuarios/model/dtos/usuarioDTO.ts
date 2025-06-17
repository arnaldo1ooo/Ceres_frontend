import { DepartamentoDTO } from "src/app/modulos/departamentos/model/dtos/departamentoDTO";
import { EntidadDetalleDTO } from "src/app/modulos/entidades/models/dtos/entidadDetalleDTO";

export interface UsuarioDTO {
  _id: string;
  entidad: EntidadDetalleDTO;
  nombreUsuario: string;
  departamento: DepartamentoDTO;
  situacion: string;
}
