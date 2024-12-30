import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/autenticacion/services/auth.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-mi-sidenav',
  templateUrl: './mi-sidenav.component.html',
  styleUrls: ['./mi-sidenav.component.scss']
})
export class MiSidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  shouldRun: boolean = true;
  isAbierto: boolean = true;
  temaOscuro: boolean = false;

  menus = [ //Las rutas se encuentran en app-routing.module
    { nombre: "Home", ruta: "home", icono: "home" },
    { nombre: "Departamentos", ruta: "departamentos", icono: "supervisor_account" },
    { nombre: "Entidades", ruta: "entidades", icono: "person_pin" },
    { nombre: "Mercaderias", ruta: "mercaderias", icono: "shopping_basket" },
    { nombre: "Movimientos", ruta: "movimientos", icono: "input" }
  ]

  private _mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.iniciarTema();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  cerrarSesion() {
    this.isAbierto = false;
    this.authService.cerrarSesion();
  }

  abrirOCerrar() {
    this.isAbierto = !this.isAbierto;
  }

  public get isSesionIniciada$(): Observable<boolean> {
    return this.authService.isSesionIniciada;
  }

  private iniciarTema() {
    const isTemaOscuroEnLocal = HelpersService.obtenerItemDelLocalStorage('temaOscuro');

    if (isTemaOscuroEnLocal === "")
      HelpersService.salvarItemEnLocalStorage('temaOscuro', this.temaOscuro.toString());

    if (isTemaOscuroEnLocal === 'true') {
      this.aplicarTemaOscuro();
      this.temaOscuro = true;
    }
  }

  public alternarTema(): void {
    if (this.temaOscuro) {
      this.aplicarTemaClaro();
    }
    else {
      this.aplicarTemaOscuro();
    }

    this.temaOscuro = !this.temaOscuro;
    HelpersService.salvarItemEnLocalStorage('temaOscuro', this.temaOscuro.toString());
  }

  private aplicarTemaClaro() {
    this.renderer.removeClass(document.body, 'theme-alternate');
  }

  private aplicarTemaOscuro() {
    this.renderer.addClass(document.body, 'theme-alternate');
  }

}
