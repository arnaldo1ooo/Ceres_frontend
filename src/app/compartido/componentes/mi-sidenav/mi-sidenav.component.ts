import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/autenticacion/services/auth.service';

@Component({
  selector: 'app-mi-sidenav',
  templateUrl: './mi-sidenav.component.html',
  styleUrls: ['./mi-sidenav.component.scss']
})
export class MiSidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  isSesionIniciada$: Observable<boolean>;
  shouldRun = true;
  isAbierto = true;

  botonesNav = [
    { nombre: "Home", ruta: "home", icono: "home" },
    { nombre: "Filiales", ruta: "filiales", icono: "" }
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

    this.isSesionIniciada$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    this.isSesionIniciada$ = this.authService.isSesionIniciada; //Se guarda valor de sesion iniciada
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  cerrarSesion() {
    this.isAbierto = false;
    this.isSesionIniciada$ = new BehaviorSubject<boolean>(false);
    this.authService.cerrarSesion();
  }

  AbrirOCerrar() {
    this.isAbierto = !this.isAbierto;
 }

}
