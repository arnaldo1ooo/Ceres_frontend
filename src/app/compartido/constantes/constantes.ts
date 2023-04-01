export class Constantes {


}
export const API_NOMBRE = 'ceres-api';
export const API_URL = 'http://localhost:8180/';  //se pone como export para poder importar directamente
export const API_URL_LOGIN = API_URL + 'login';
export const API_URL_MERCADERIAS = API_URL + API_NOMBRE + '/mercaderias';
export const API_URL_SUCURSALES = API_URL + API_NOMBRE + '/sucursales';
export const API_URL_FILIALES = API_URL +  API_NOMBRE + '/filiales';

export const DEFAULT_PAGE_TAMANHO = 10;
export const DEFAULT_PAGE_TAMANHOS = [10, 20, 50];
export const DEFAULT_ORDENAR_POR = 'id';
export const PAGE_INICIAL = 0;

export const COD_ERROR_DATOS_INVALIDOS = 400;
export const COD_ERROR_CONEXION = 0;

export const COD_ESPANHOL = 'es';
export const COD_PORTUGUES = 'pt';
export const COD_IDIOMA_DEFAULT = COD_ESPANHOL;
