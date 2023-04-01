import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { COD_ERROR_CONEXION, COD_ERROR_DATOS_INVALIDOS } from 'src/app/compartido/constantes/constantes';
import { Login } from 'src/app/modulos/login/model/login';
import { LoginService } from 'src/app/modulos/login/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  credenciales: Login = {
    nombreUsuario: '',
    contrasena: ''
  };

  constructor(
    private _loginService: LoginService,
    private _ruta: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  login(form: NgForm){
    //console.log('Form valores', form.value)

    this._loginService.login(this.credenciales)
    .subscribe(response => {
      this._ruta.navigate(['/home']);  //Caso se acepte las credenciales, se redirige al home
    },
    error =>{
      if (error.status === COD_ERROR_DATOS_INVALIDOS) {
        this.onError('Nombre de usuario o contraseña incorrecta');
      } else if (error.status === COD_ERROR_CONEXION) {
        this.onError('Error de conexión con el servidor');
      } else {
        this.onError('Falló el inicio de sesión');
      }
    }
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

}
