import { OrdenItem } from '../orden-item';
import { AdicionalDTO } from './adicional-DTO';

export interface AdicionalItemDTO {
  id: number;
  ordenItem: OrdenItem;
  adicional: AdicionalDTO,
  valor: number;
}
