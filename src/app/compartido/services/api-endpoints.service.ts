import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { API_NOMBRE } from '../constantes/constantes';


@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService  {
  public API_URL_SERVER: string;

  public API_URL_LOGIN: string;
  public API_URL_IS_NOMBRE_USUARIO_EXISTE: string;
  public API_URL_VERSION_ACTUAL: string;
  public API_URL_BD_ACTUAL: string;

  public API_URL_MERCADERIAS: string;
  public API_URL_SUCURSALES: string;
  public API_URL_DPTOS_POLITICO: string;

  public API_URL_MUNICIPIOS: string;
  public API_URL_MUNICIPIOS_POR_DPTO_POLITICO: string;

  public API_URL_DEPARTAMENTOS: string;
  public API_URL_TIPOS_MOVIMIENTO: string;
  public API_URL_MOVIMIENTOS: string;
  public API_URL_MONEDAS: string;
  public API_URL_ENTIDADES: string;
  public API_URL_CUENTAS_CONTABLES: string;
  
  constructor(private configService: ConfigService) {
    this.API_URL_SERVER = this.configService.baseUrl; 

    this.API_URL_LOGIN = this.configService.getAPIUrl('/login');
    this.API_URL_IS_NOMBRE_USUARIO_EXISTE = this.API_URL_LOGIN + '/isNombreUsuarioExiste';
    this.API_URL_VERSION_ACTUAL = this.API_URL_LOGIN + '/versionActual';
    this.API_URL_BD_ACTUAL = this.API_URL_LOGIN + '/bdActual';

    this.API_URL_MERCADERIAS = this.configService.getAPIUrl('/mercaderias');
    this.API_URL_SUCURSALES = this.configService.getAPIUrl('/sucursales');
    this.API_URL_DPTOS_POLITICO = this.API_URL_SERVER + API_NOMBRE + '/departamentosPolitico';

    this.API_URL_MUNICIPIOS = this.API_URL_SERVER + API_NOMBRE + '/municipios';
    this.API_URL_MUNICIPIOS_POR_DPTO_POLITICO = this.API_URL_SERVER + API_NOMBRE + '/municipios' + '/filtrarPorDepartamentoPolitico';

    this.API_URL_DEPARTAMENTOS = this.API_URL_SERVER + API_NOMBRE + '/departamentos';
    this.API_URL_TIPOS_MOVIMIENTO = this.API_URL_SERVER + API_NOMBRE + '/tipos-movimiento';
    this.API_URL_MOVIMIENTOS = this.API_URL_SERVER + API_NOMBRE + '/movimientos';
    this.API_URL_MONEDAS = this.API_URL_SERVER + API_NOMBRE + '/monedas';
    this.API_URL_ENTIDADES = this.API_URL_SERVER + API_NOMBRE + '/entidades';
    this.API_URL_CUENTAS_CONTABLES = this.API_URL_SERVER + API_NOMBRE + '/cuentasContables';
  }


}