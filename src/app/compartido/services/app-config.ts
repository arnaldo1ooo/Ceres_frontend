import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Config {
  url: string;
}
export interface IAppConfig {
  baseUrl: string;
  baseDMUrl: string;
  baseStandardUrl: string;
  load: () => Promise<void>;
}
@Injectable()
export class AppConfig implements IAppConfig {
  public baseUrl!: string;
  public baseDMUrl!: string;
  public baseStandardUrl!: string;
  constructor(private readonly http: HttpClient) { }

  public load(): Promise<void> {
    return this.http
      .get<Config>('assets/config.json')
      .toPromise()
      .then(config => {
        if (config) {
          this.baseUrl = config.url;
        } else {
          console.error('Config es undefined');
          // Manejo de error si config es undefined
        }
      })
      .catch(error => {
        console.error('Error cargando config:', error);
      });
  }
}

export function initConfig(config: AppConfig): () => Promise<void> {
  return () => config.load();
}