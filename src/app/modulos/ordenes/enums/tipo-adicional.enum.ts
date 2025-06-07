export enum TipoAdicional {
  TAMANHO = 'T',
  BORDE = 'B',
  SABOR = 'S'
}

export const ListDescripciones: Record<TipoAdicional, string> = {
  [TipoAdicional.TAMANHO]: 'Tamaño',
  [TipoAdicional.BORDE]: 'Borde',
  [TipoAdicional.SABOR]: 'Sabor'
};

export const ListTiposSeleccionMultiple: Record<TipoAdicional, boolean> = {
  [TipoAdicional.TAMANHO]: false,
  [TipoAdicional.BORDE]: false,
  [TipoAdicional.SABOR]: true
};

export function isSeleccionMultiple(tipoAdic: TipoAdicional): boolean {
  return ListTiposSeleccionMultiple[tipoAdic] ?? false;
}

export function obtenerDescripcionTipo(tipo: string): string {
  if (Object.values(TipoAdicional).includes(tipo as TipoAdicional)) {
    return ListDescripciones[tipo as TipoAdicional];
  }

  return tipo; // Si no coincide, devolvé el string original o un fallback
}
