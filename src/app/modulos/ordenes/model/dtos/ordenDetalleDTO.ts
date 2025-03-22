import { DepartamentoDTO } from "src/app/modulos/departamentos/model/dtos/departamentoDTO";
import { EstadoOrden } from "../../enums/estado-orden.enum";
import { TipoEntregaOrden } from "../../enums/tipoEntregaOrden.enum";
import { EntidadDetalleDTO } from "src/app/modulos/entidades/models/dtos/entidadDetalleDTO";
import { MonedaDTO } from "src/app/modulos/monedas/models/dtos/monedaDTO";
import { UsuarioDTO } from "src/app/modulos/usuarios/model/dtos/usuarioDTO";
import { OrdenItemDTO } from "./ordenItemDTO";

export interface OrdenDetalleDTO {
  _id?: number;
  numero: string;
  entidad: EntidadDetalleDTO
  nombreApellidoEntidad: string
  nombreApellidoOcasional?: string;
  celularOcasional?: string;
  fechaEmision: Date;
  departamento: DepartamentoDTO;
  moneda: MonedaDTO;
  usuario: UsuarioDTO;
  descuentoGlobal: number;
  tipoEntrega: TipoEntregaOrden;
  notificado: string;
  motivoCancelacion?: string;
  estado: EstadoOrden;
  numeroMesa?: string;
  observacion: string;
  items: OrdenItemDTO[];
}
