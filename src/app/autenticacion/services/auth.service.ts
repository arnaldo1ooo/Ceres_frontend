import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Login } from 'src/app/modulos/login/model/login';
import { API_URL_IS_NOMBRE_USUARIO_EXISTE, API_URL_PERMISOS_USUARIO_LOGUEADO, API_URL_TENANTS_VALIDAR } from 'src/app/compartido/constantes/constantes';
import { jwtDecode } from 'jwt-decode';
import { ApiPageResponse } from 'src/app/compartido/interfaces/api-page-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionIniciada; //Se piede el valor al recargar pagina
  private permisosUsuarioLogueado: string[] = [];

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
    this.sesionIniciada = new BehaviorSubject<boolean>(this.isTokenValido(this.getTokenAlmacenado()));
  }

  login(credenciales: Login, API: string) {
    return this._httpClient.post(API, credenciales, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;

        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer', '');

        if (this.isTokenValido(token)) {
          this.sesionIniciada.next(true); //Caso el token sea valido, sesion iniciada true
          HelpersService.salvarItemEnLocalStorage('token', token); //Se guarda el token por si el usuario cierra la ventana y con esto no tenga que volver a iniciar sesion
          HelpersService.salvarItemEnSessionStorage('departamentoLogado', credenciales.departamento);
        }

        return body;
      }));
  }

  cerrarSesion() {
    this.sesionIniciada.next(false);
    HelpersService.removerItemDelLocalStorage('token');
    HelpersService.removerItemDelSessionStorage('departamentoLogado');
    this._router.navigate(['login']);
  }

  getTokenAlmacenado() {
    return HelpersService.obtenerItemDelLocalStorage('token');
  }

  getTenantKeyAlmacenado() {
    return HelpersService.obtenerItemDelLocalStorage('tenantKey');
  }

  public get isSesionIniciada() {
    return this.sesionIniciada.asObservable();
  }

  public isTokenValido(token: any): boolean {
    return HelpersService.isNoNuloYNoVacioYNoUndefined(token)
      && !HelpersService.isTokenExpirado(token);
  }

  public async isNombreUsuarioExiste(nombreUsuario: string): Promise<boolean> {
    try {
      return await firstValueFrom(this._httpClient.get<boolean>(API_URL_IS_NOMBRE_USUARIO_EXISTE
        + `?nombreUsuario=${nombreUsuario}`));

    } catch (error) {
      console.error(error);
      throw error; // Relanzar el error para que pueda ser manejado en un nivel superior
    }
  }

  public cargarPermisosUsuarioLogueado(): Observable<string[]> {
    return this._httpClient.get<string[]>(API_URL_PERMISOS_USUARIO_LOGUEADO).pipe(
      tap(permisos => {
        // Si el backend no devuelve resultados, inicializa como un array vacío
        this.permisosUsuarioLogueado = permisos || [];
      }),
      catchError(error => {
        // En caso de error, inicializa como un array vacío y opcionalmente maneja el error
        console.error('Error al cargar permisos:', error);
        this.permisosUsuarioLogueado = [];
        return of([]); // Retorna un observable con un array vacío
      })
    );
  }

  public isTienePermiso(permiso: string): boolean {
    if (this.sesionIniciada) {
      return this.isUsuarioPoseeRolSuper()
        || this.permisosUsuarioLogueado?.includes(permiso) || false;
    }

    return false;
  }

  public getNombreUsuarioToken(): string | null {
    try {
      const decodedToken: any = jwtDecode(this.getTokenAlmacenado());
      return decodedToken?.username || decodedToken?.sub || null;
    }
    catch (error) {
      console.error('Error al decodificar el token para obtener nombreUsuario:', error);
      return null;
    }
  }

  private isUsuarioPoseeRolSuper(): boolean {
    return this.getRolesDeToken().includes('ROLE_SUPERUSUARIO');
  }

  public getRolesDeToken(): string[] {
    try {
      const token: string = this.getTokenAlmacenado();
      const decodedToken: any = token != null && token != ""
        ? jwtDecode(token) : null;
      const roles = decodedToken?.roles || [];

      return roles ? roles.map((rol: any) => rol.authority) : [];
    }
    catch (error) {
      console.error('Error al decodificar el token para obtener los roles:', error);
      return [];
    }
  }

  public validarTenant(tenantKey: string): Observable<ApiPageResponse> {
    return this._httpClient.get<ApiPageResponse>(API_URL_TENANTS_VALIDAR + `${tenantKey}`);
  }


}
