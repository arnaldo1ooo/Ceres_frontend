import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Config {
  apiUrlServer: string;
}

export interface IAppConfig {
  apiUrlServer: string;
  load: () => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IAppConfig {
  public apiUrlServer!: string;

  constructor(private readonly _http: HttpClient) { }

  public async load(): Promise<void> {
    try {
      console.log("Se carga config");
      const config = await lastValueFrom(this._http.get<Config>('assets/config.json'));

      if (config) {
        this.apiUrlServer = config.apiUrlServer; //Se obtiene el apiUrlServer del archivo Config del Docker, ubicado en /usr/share/nginx/html/assets/config.json
      }
      else {
        console.error('Config es undefined');
      }
    } 
    catch (error) {
      console.error('No se pudo cargar config:', error);
    }
  }

}

export function iniciarConfig(configService: ConfigService): () => Promise<void> {
  return () => configService.load();
}