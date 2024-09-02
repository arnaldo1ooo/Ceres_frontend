import { Component } from '@angular/core';
import { LoginService } from '../../../modulos/login/services/login.service';
import { FORMATO_FECHA_HORA_SIN_SEG_COMUN } from '../../constantes/constantes';
import { FechaHelpersService } from '../../services/fecha-helpers.service';

@Component({
  selector: 'app-footer-principal',
  templateUrl: './footer-principal.component.html',
  styleUrls: ['./footer-principal.component.scss']
})
export class FooterPrincipalComponent {
  nombreBaseDatos: string = 'NO DISPONIBLE';
  versionBackEnd: string = '0.0.0';
  versionFrontEnd: string = '0.0.0';
  fechaHoraActual: string = FechaHelpersService.formatearFechaCustom(new Date, FORMATO_FECHA_HORA_SIN_SEG_COMUN);

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerBaseDatosActual();
    this.obtenerVersionBackEnd();
    this.obtenerVersionFrontEnd();
    this.actualizarFechaHora();
  }

  private actualizarFechaHora() {
    setInterval(() => {
      this.fechaHoraActual = FechaHelpersService.formatearFechaCustom(new Date, 'DD/MM/yyyy HH:mm');
    }, 30000);
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
