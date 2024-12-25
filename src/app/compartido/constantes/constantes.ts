export class Constantes {

}
export const API_NOMBRE: string = '/ceres-api';

export const DEFAULT_PAGE_TAMANHO: number = 10;
export const DEFAULT_PAGE_TAMANHOS: number[] = [10, 20, 50];
export const DEFAULT_ORDENAR_POR: string = 'id';
export const PAGE_INICIAL: number = 0;

export const COD_ERROR_DATOS_INVALIDOS: number = 400;
export const COD_ERROR_CONEXION: number = 0;

export const COD_ESPANHOL: string = 'es';
export const COD_PORTUGUES: string = 'pt';
export const COD_IDIOMA_DEFAULT: string = COD_ESPANHOL;

//Configuraciones de region
export const FORMATO_REGIONAL_ES: string = 'es'; //"es-ES" para que utilice dd/mm/yyyy

export const HORA_INICIAL: number = 0;
export const MINUTO_INICIAL: number = 0;
export const SEGUNDO_INICIAL: number = 0;

export const HORA_FINAL: number = 23;
export const MINUTO_FINAL: number = 59;
export const SEGUNDO_FINAL: number = 59;

//SELECT
export const ID_OPCION_TODOS: number = -1;

//FORMATO FECHAS
export const FORMATO_FECHA_HORA_COMUN: string = 'DD/MM/yyyy HH:mm:ss';
export const FORMATO_FECHA_HORA_SIN_SEG_COMUN: string = 'DD/MM/yyyy HH:mm';
export const FORMATO_FECHA_HORA_ISO8601: string = 'YYYY-MM-DDTHH:mm:ss';
