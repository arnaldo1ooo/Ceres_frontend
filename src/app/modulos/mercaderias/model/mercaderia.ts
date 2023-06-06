
export interface Mercaderia {

  _id: string;
  descripcion: string;
  tipo: string;
  departamento: string;
  situacion: string;
}

export interface Page {
  content: Array<Mercaderia>
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort?: any;
  numberOfElements: number;
  first: boolean;
};
