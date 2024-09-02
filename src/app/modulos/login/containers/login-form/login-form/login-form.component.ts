import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { COD_ERROR_CONEXION, COD_ERROR_DATOS_INVALIDOS } from 'src/app/compartido/constantes/constantes';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';
import { Login } from 'src/app/modulos/login/model/login';
import { LoginService } from 'src/app/modulos/login/services/login.service';
import { Sucursal } from 'src/app/modulos/sucursales/model/sucursal.model';
import { SucursalesService } from 'src/app/modulos/sucursales/services/sucursales.service';
import { Departamento } from '../../../../departamentos/model/departamento.model';
import { AvisoHelpersService } from '../../../../../compartido/services/aviso-helpers.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  credenciales: Login = new Login();

  listaSucursales!: Sucursal[];
  listaDepartamentos!: Departamento[];

  constructor(
    private _loginService: LoginService,
    private _ruta: Router,
    public dialog: MatDialog,
    private _translocoService: TranslocoService,
    private _sucursalesService: SucursalesService,
    private _departamentosService: DepartamentosService,
    private _avisoHelpersService: AvisoHelpersService) { }

  ngOnInit(): void {

  }

  login() {
    if (this.isCamposValidos()) {
      this._loginService.login(this.credenciales)
        .pipe(
          finalize(() => {
            HelpersService.salvarItemEnSessionStorage('nombreUsuarioLogado', this.credenciales.nombreUsuario);
            HelpersService.salvarItemEnSessionStorage('sucursalLogado', this.credenciales.sucursal);
            HelpersService.salvarItemEnSessionStorage('departamentoLogado', this.credenciales.departamento);
          })
        )
        .subscribe({
          next: (response) => {
            this._ruta.navigate(['/home']); // Manejar respuesta exitosa - redirigir al home
          },
          error: (error) => {
            // Manejar error
            if (error.status === COD_ERROR_DATOS_INVALIDOS) {
              this.onError(this._translocoService.translate('errores.error-login-incorrecto'));
            } else if (error.status === COD_ERROR_CONEXION) {
              this.onError(this._translocoService.translate('errores.error-conexion-servidor'));
            } else {
              this.onError(this._translocoService.translate('errores.error-login'));
            }
          },
        });
    }
  }

  private isCamposValidos(): boolean {
    let isValido: boolean = true;
    let mensaje: string = '';

    if (HelpersService.isNuloOrVacio(this.credenciales.nombreUsuario)) {
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
    if(HelpersService.isNoNuloYNoVacio(this.credenciales.nombreUsuario)) {
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
