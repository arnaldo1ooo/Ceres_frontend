import { Departamento } from "../../departamentos/model/departamento.model";
import { Entidad } from "../../entidades/models/entidad.model";
import { EstadoOrden } from "../enums/estado-orden.enum";
import { TipoEntregaOrden } from "../enums/tipoEntregaOrden.enum";
import { OrdenItem } from "./ordenItem";

export class Orden {
  _id: string = '';
  numero: string = '';
  entidad: Entidad = new Entidad();
  nombreApellidoOcasional: string = '';
  celularOcasional: string = '';
  fechaEmision: Date | null = null;
  departamento: Departamento = new Departamento();
  descuentoGlobal: number = 0;
  tipoEntrega: TipoEntregaOrden | null = null;
  notificado: string = '';
  motivoCancelacion: string = '';
  estado: EstadoOrden | null = null;
  numeroMesa: string = '';
  observacion: string = '';
  items: OrdenItem | null = null;

  constructor() {

  }
}
