import { DepartamentoDTO } from "src/app/modulos/departamentos/model/dtos/departamentoDTO";
import { EstadoOrden } from "../../enums/estado-orden.enum";
import { TipoEntregaOrden } from "../../enums/tipoEntregaOrden.enum";

export interface OrdenListaDTO {
  _id?: number;
  numero: string;
  nombreApellidoEntidad: string
  nombreApellidoOcasional?: string;
  celularOcasional?: string;
  fechaEmision: Date;
  departamento: DepartamentoDTO;
  tipoEntrega: TipoEntregaOrden;
  notificado: string;
  motivoCancelacion?: string;
  estado: EstadoOrden;
  numeroMesa?: string;
  observacion: string;
}
