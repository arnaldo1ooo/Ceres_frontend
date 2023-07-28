import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/autenticacion/services/auth.service';

@Component({
  selector: 'app-mi-sidenav',
  templateUrl: './mi-sidenav.component.html',
  styleUrls: ['./mi-sidenav.component.scss']
})
export class MiSidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  shouldRun = true;
  isAbierto = true;

  menus = [
    { nombre: "Home", ruta: "home", icono: "home" },
    { nombre: "Departamentos", ruta: "departamentos", icono: "" },
    { nombre: "Mercaderias", ruta: "mercaderias", icono: "" },
    { nombre: "Movimientos", ruta: "movimientos", icono: "" }
  ]

  private _mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  cerrarSesion() {
    this.isAbierto = false;
    this.authService.cerrarSesion();
  }

  AbrirOCerrar() {
    this.isAbierto = !this.isAbierto;
 }

 public get isSesionIniciada$(): Observable<boolean> {
  return this.authService.isSesionIniciada;
 }

}
