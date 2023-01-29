import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { Login } from 'src/app/login/model/login';
import { LoginService } from 'src/app/login/services/login.service';

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
    private loginService: LoginService,
    private ruta: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login(form: NgForm){
    //console.log('Form valores', form.value)

    this.loginService.login(this.credenciales)
    .subscribe(response => {
      this.ruta.navigate(['/home']);  //Caso se acepte las credenciales, se redirige al home
    },
    error =>this.onError('Falló el inicio de sesión')
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

}
