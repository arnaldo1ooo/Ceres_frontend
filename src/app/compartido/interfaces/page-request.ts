import { Orden } from "../enums/orden.enum";

//Es el cuerpo de page para realizar la requisicion a un endpoint pageable
export interface PageRequest {

  pagina: number;
  tamanho: number;
  ordenarPor: string;
  orden: Orden;
}
