import { Component, OnInit } from '@angular/core';
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
import { Sucursal } from 'src/app/modulos/sucursales/model/sucursal';
import { SucursalesService } from 'src/app/modulos/sucursales/services/sucursales.service';
import { Departamento } from '../../../../departamentos/model/departamento';

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
    private _departamentosService: DepartamentosService) { }

  ngOnInit(): void {

  }

  login() {
    this._loginService.loginCredenciales = this.credenciales;

    this._loginService.login(this.credenciales)
      .subscribe(response => {
        this._ruta.navigate(['/home']);  //Caso se acepte las credenciales, se redirige al home
      },
        error => {
          if (error.status === COD_ERROR_DATOS_INVALIDOS) {
            this.onError(this._translocoService.translate('errores.error-login-incorrecto'));
          } else if (error.status === COD_ERROR_CONEXION) {
            this.onError(this._translocoService.translate('errores.error-conexion-servidor'));
          } else {
            this.onError(this._translocoService.translate('errores.error-login'));
          }
        }
      )
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
    let isNombreUsuarioExiste: boolean = await this._loginService.isNombreUsuarioExiste(this.credenciales.nombreUsuario);

    console.log(isNombreUsuarioExiste ? "Nombrede usuario existe" : "Nombre de usuario no existe");

    if(isNombreUsuarioExiste) { //await espera hasta recibir respuesta de servidor
      this._sucursalesService.listarTodosSucursales().subscribe((lista: any) => {
        this.listaSucursales = lista;
      });
    }
  }

  public listarDepartamentos(idSucursal: string) {
    this._departamentosService.listarTodosPorSucursal(idSucursal).subscribe((lista: any) => {
      this.listaDepartamentos = lista;
    })
  }
}
