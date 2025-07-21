import { OrdenItem } from '../orden-item';
import { AdicionalDTO } from './adicional-DTO';
import { OrdenItemDTO } from './orden-item-DTO';

export interface AdicionalItemDTO {
  _id: number | null;
  adicional: AdicionalDTO,
  valor: number;
}
