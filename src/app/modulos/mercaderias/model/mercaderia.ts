
export class Mercaderia {

  _id: string = '';
  descripcion: string | null = null;
  tipo: string | null = null;
  departamento: string | null = null;
  situacion: string | null = null;
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
