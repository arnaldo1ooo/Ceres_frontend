import { Component } from '@angular/core';
import { LoginService } from '../../../modulos/login/services/login.service';

@Component({
  selector: 'app-footer-principal',
  templateUrl: './footer-principal.component.html',
  styleUrls: ['./footer-principal.component.scss']
})
export class FooterPrincipalComponent {
  nombreBaseDatos: string = 'NO DISPONIBLE';
  versionBackEnd: string = '0.0.0';
  versionFrontEnd: string | undefined = '0.0.0';
  fechaHoraActual: string = new Date().toLocaleString();

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerBaseDatosActual();
    this.obtenerVersionBackEnd();
    this.obtenerVersionFrontEnd();
    this.actualizarFechaHoraPorSegundo();
  }

  private actualizarFechaHoraPorSegundo() {
    setInterval(() => {
      this.fechaHoraActual = new Date().toLocaleString();
    }, 1000);
  }

  private obtenerVersionBackEnd() {
    this._loginService.getVersionBackeEnd().subscribe({
      next: (resp:string) => {
        this.versionBackEnd = resp;
      },
      error: (err:any) => {
        console.error('Error al consultar version del backend: ' + err.message)
      }
    });
  }

  private obtenerVersionFrontEnd() {
    const packageJson = require('package.json');
    this.versionFrontEnd = packageJson.version;
  }

  private obtenerBaseDatosActual() {
    this._loginService.getBaseDatosActual().subscribe({
      next: (resp:string) => {
        this.nombreBaseDatos = resp;
      },
      error: (err:any) => {
        console.error('Error al consultar base de datos actual: ' + err.message)
      }
    });
  }

}
