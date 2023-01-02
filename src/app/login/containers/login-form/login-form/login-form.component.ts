import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    private ruta: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm){
    //console.log('Form valores', form.value)

    this.loginService.login(this.credenciales)
    .subscribe(response => {
      this.ruta.navigate(['/']);
    })
  }

}
