export interface Orden {
  id?: number;
  numero: string;
  nombreApellidoOcasional?: string;
  celularOcasional?: string;
  fechaEmision: Date;
  descuentoGlobal: number;
  tipoEntrega: string;        // L, D, M (según tu converter)
  notificado: string;         // S o N
  motivoCancelacion?: string;
  estado: string;             // P, E, L, D, T, C
  numeroMesa?: string;
  observacion?: string;
  // ... y lo que necesites (entidad, usuario, etc. si deseas mostrar)
}
