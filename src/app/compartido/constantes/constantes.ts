
export class Constantes {


}
export const API_NOMBRE = 'ceres-api';
export const API_URL = 'http://localhost:8080/';  //se pone como export para poder importar directamente
export const API_URL_LOGIN = API_URL + 'login';
export const API_URL_IS_NOMBRE_USUARIO_EXISTE = API_URL_LOGIN + '/isNombreUsuarioExiste';
export const API_URL_VERSION_ACTUAL = API_URL_LOGIN + '/versionActual';
export const API_URL_MERCADERIAS = API_URL + API_NOMBRE + '/mercaderias';
export const API_URL_SUCURSALES = API_URL + API_NOMBRE + '/sucursales';
export const API_URL_DEPARTAMENTOS = API_URL + API_NOMBRE + '/departamentos';
export const API_URL_TIPOS_MOVIMIENTO = API_URL + API_NOMBRE + '/tipos-movimiento';
export const API_URL_MOVIMIENTOS = API_URL + API_NOMBRE + '/movimientos';
export const API_URL_MONEDAS = API_URL + API_NOMBRE + '/monedas';
export const API_URL_ENTIDADES = API_URL + API_NOMBRE + '/entidades';
export const API_URL_CUENTAS_CONTABLES = API_URL + API_NOMBRE + '/cuentasContables';

export const DEFAULT_PAGE_TAMANHO = 10;
export const DEFAULT_PAGE_TAMANHOS = [10, 20, 50];
export const DEFAULT_ORDENAR_POR = 'id';
export const PAGE_INICIAL = 0;

export const COD_ERROR_DATOS_INVALIDOS = 400;
export const COD_ERROR_CONEXION = 0;

export const COD_ESPANHOL = 'es';
export const COD_PORTUGUES = 'pt';
export const COD_IDIOMA_DEFAULT = COD_ESPANHOL;

//Configuraciones de region
export const FORMATO_REGIONAL_ES = 'es'; //"es-ES" para que utilice dd/mm/yyyy

export const HORA_INICIAL = 0;
export const MINUTO_INICIAL = 0;
export const SEGUNDO_INICIAL = 0;

export const HORA_FINAL = 23;
export const MINUTO_FINAL = 59;
export const SEGUNDO_FINAL = 59;

//SELECT
export const ID_OPCION_TODOS = -1;
