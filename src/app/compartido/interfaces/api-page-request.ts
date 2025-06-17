import { Ordenamiento } from "../enums/ordenamiento.enum";

//Es el cuerpo de page para realizar la requisicion a un endpoint pageable
export interface ApiPageRequest {

  pagina: number;
  tamanho: number;
  ordenarPor: string;
  ordenamiento: Ordenamiento;
}
