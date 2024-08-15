import { environment } from "src/environments/environment";

export class Constantes {


}
export const API_NOMBRE: string = 'ceres-api';
export const API_CERES_URL = 'http://localhost:8080/';
export const API_URL_LOGIN: string = API_CERES_URL + 'login';
export const API_URL_IS_NOMBRE_USUARIO_EXISTE: string = API_URL_LOGIN + '/isNombreUsuarioExiste';
export const API_URL_VERSION_ACTUAL: string = API_URL_LOGIN + '/versionActual';
export const API_URL_BD_ACTUAL: string = API_URL_LOGIN + '/bdActual';
export const API_URL_MERCADERIAS: string = API_CERES_URL + API_NOMBRE + '/mercaderias';
export const API_URL_SUCURSALES: string = API_CERES_URL + API_NOMBRE + '/sucursales';
export const API_URL_DPTOS_POLITICO: string = API_CERES_URL + API_NOMBRE + '/departamentosPolitico';

export const API_URL_MUNICIPIOS: string = API_CERES_URL + API_NOMBRE + '/municipios';
export const API_URL_MUNICIPIOS_POR_DPTO_POLITICO: string = API_CERES_URL + API_NOMBRE + '/municipios' + '/filtrarPorDepartamentoPolitico';

export const API_URL_DEPARTAMENTOS: string = API_CERES_URL + API_NOMBRE + '/departamentos';
export const API_URL_TIPOS_MOVIMIENTO: string = API_CERES_URL + API_NOMBRE + '/tipos-movimiento';
export const API_URL_MOVIMIENTOS: string = API_CERES_URL + API_NOMBRE + '/movimientos';
export const API_URL_MONEDAS: string = API_CERES_URL + API_NOMBRE + '/monedas';
export const API_URL_ENTIDADES: string = API_CERES_URL + API_NOMBRE + '/entidades';
export const API_URL_CUENTAS_CONTABLES: string = API_CERES_URL + API_NOMBRE + '/cuentasContables';

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
