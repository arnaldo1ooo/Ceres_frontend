import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';
import { Login } from 'src/app/modulos/login/model/login';
import { LoginService } from 'src/app/modulos/login/services/login.service';
import { Sucursal } from 'src/app/modulos/sucursales/model/sucursal.model';
import { SucursalesService } from 'src/app/modulos/sucursales/services/sucursales.service';
import { Departamento } from '../../../../departamentos/model/departamento.model';
import { AvisoHelpersService } from '../../../../../compartido/services/aviso-helpers.service';
import { finalize } from 'rxjs';
import { COD_ERROR_CONEXION, COD_ERROR_DATOS_INVALIDOS, COD_NOT_FOUND } from 'src/app/compartido/constantes/constantes';
import { AuthService } from 'src/app/autenticacion/services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  public credenciales: Login = new Login();
  public listaSucursales!: Sucursal[];
  public listaDepartamentos!: Departamento[];
  public tenantKeyInformado: boolean = false;

  constructor(
    private _loginService: LoginService,
    private _route: Router,
    public dialog: MatDialog,
    private _translocoService: TranslocoService,
    private _sucursalesService: SucursalesService,
    private _departamentosService: DepartamentosService,
    private _avisoHelpersService: AvisoHelpersService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.inicializarTenantKey();
  }

  private inicializarTenantKey() {
    const tenantKey: string = this._authService.getTenantKeyAlmacenado();

    if (tenantKey) {
      this.credenciales.tenantKey = tenantKey;
      this.tenantKeyInformado = true;
    }
    else {
      this.tenantKeyInformado = false;
    }
  }

  onLogin() {
    if (this.isCamposValidos()) {
      this._loginService.login(this.credenciales)
        .subscribe({
          next: (response) => {
            this._route.navigate(['/home']); // Manejar respuesta exitosa - redirigir al home
          },
          error: (error) => {
            // Manejar error
            if (error.error.mensajes) {
              this.onError(error.error.mensajes);
            }
            if (error.status === COD_ERROR_DATOS_INVALIDOS) {
              this.onError(this._translocoService.translate('errores.error-login-incorrecto'));
            }
            else if (error.status === COD_ERROR_CONEXION) {
              this.onError(this._translocoService.translate('errores.error-conexion-servidor'));
            }
            else {
              this.onError(this._translocoService.translate('errores.error-login'));
            }
          },
        });
    }
  }

  onSiguiente() {
    const tenant = this.credenciales.tenantKey?.trim();

    if (tenant) {
      HelpersService.salvarItemEnLocalStorage('tenantKey', tenant);

      this._authService.validarTenant(tenant).subscribe({
        next: () => {
          // Si el backend responde OK (200), seguimos
          this.tenantKeyInformado = true;
        },
        error: (err) => {
          HelpersService.removerItemDelLocalStorage('tenantKey');
          if (err.status === COD_NOT_FOUND) {
            this._avisoHelpersService.mostrarMensaje('Tenant key invalido');
          }
          else {
            this._avisoHelpersService.mostrarMensaje('Error al validar tenant');
          }
        }
      });
    }
    else {
      this._avisoHelpersService.mostrarMensaje('Debe ingresar el Tenant Key');
    }
  }

  private isCamposValidos(): boolean {
    let isValido: boolean = true;
    let mensaje: string = '';

    if (HelpersService.isNuloOrVacio(this.credenciales.tenantKey)) {
      mensaje = "Ingrese un Tenant Key válido!"
      isValido = false;
      document.getElementById('tenantKeyInput')?.focus();
    }
    else if (HelpersService.isNuloOrVacio(this.credenciales.nombreUsuario)) {
      mensaje = "Ingrese un nombre de usuario!"
      isValido = false;
      document.getElementById('nombreUsuarioInput')?.focus();
    }
    else if (HelpersService.isNuloOrVacio(this.credenciales.contrasena)) {
      mensaje = "Ingrese la contraseña!"
      isValido = false;
      document.getElementById('contrasenaInput')?.focus();
    }
    else if (HelpersService.isNuloOrVacio(this.credenciales.sucursal._id)) {
      mensaje = "Seleccione la sucursal!"
      isValido = false;
      document.getElementById('sucursalSelect')?.focus();
    }
    else if (HelpersService.isNuloOrVacio(this.credenciales.departamento._id)) {
      mensaje = "Seleccione el departamento!"
      isValido = false;
      document.getElementById('departamentoSelect')?.focus();
    }

    if (!isValido) {
      this._avisoHelpersService.mostrarMensaje(mensaje);
    }

    return isValido;
  }

  onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  protected compararOpcionesSelect(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionRecibida);
  }

  public async listarSucursales() {
    if (HelpersService.isNoNuloYNoVacio(this.credenciales.nombreUsuario)) {
      let isNombreUsuarioExiste: boolean = await this._loginService.isNombreUsuarioExiste(this.credenciales.nombreUsuario);

      if (isNombreUsuarioExiste) { //await espera hasta recibir respuesta de servidor
        this._sucursalesService.listarTodosSucursales().subscribe((lista: any) => {
          this.listaSucursales = lista;
        });
      }
    }
  }

  public listarDepartamentosPorSucursal(idSucursal: string) {
    this._departamentosService.listarTodosPorSucursal(idSucursal).subscribe((lista: any) => {
      this.listaDepartamentos = lista;
    })
  }


}
