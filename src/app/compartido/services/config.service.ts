import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_NOMBRE } from '../constantes/constantes';
import { lastValueFrom } from 'rxjs';

interface Config {
  url: string;
}

export interface IAppConfig {
  baseUrl: string;
  baseDMUrl: string;
  baseStandardUrl: string;
  load: () => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IAppConfig {
  public baseUrl!: string;
  public baseDMUrl!: string;
  public baseStandardUrl!: string;

  constructor(private readonly http: HttpClient) { }

  public load(): Promise<void> {
    return lastValueFrom(
      this.http.get<Config>('assets/config.templ.json')
    )
      .then(config => {
        if (config) {
          this.baseUrl = config.url;
        } else {
          console.error('Config es undefined');
        }
      })
      .catch(error => {
        console.error('Error cargando config:', error);
      });
  }

  public getAPIUrl(endpoint: string): string {
    return this.baseUrl + API_NOMBRE + endpoint;
  }
}

export function initConfig(config: ConfigService): () => Promise<void> {
  return () => config.load();
}