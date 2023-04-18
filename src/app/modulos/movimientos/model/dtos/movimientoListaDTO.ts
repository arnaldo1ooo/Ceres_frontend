export interface MovimientoListaDTO {
  _id: string;
  tipo: string;
  nombreApellido: string;
  fechaEmision: Date;
  departamento: string;
  total: number;
  situacion: string;
}

export interface Page {
  content: Array<MovimientoListaDTO>
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort?: any;
  numberOfElements: number;
  first: boolean;
};
