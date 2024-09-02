export interface ApiResponse<T> {
  codigo: number;
  mensajes: string[];
  data: T;
}
