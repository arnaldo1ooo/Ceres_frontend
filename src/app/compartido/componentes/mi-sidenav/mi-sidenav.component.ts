import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-sidenav',
  templateUrl: './mi-sidenav.component.html',
  styleUrls: ['./mi-sidenav.component.scss']
})
export class MiSidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  botonesNav = [
    {nombre: "Home", ruta:"home", icono: "home"},
    {nombre: "Filiales", ruta:"filiales", icono: ""}
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit() {

  }

}
