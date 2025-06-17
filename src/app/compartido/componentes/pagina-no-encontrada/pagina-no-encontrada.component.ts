import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-no-encontrada',
  standalone: true,
  imports: [],
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrl: './pagina-no-encontrada.component.scss'
})
export class PaginaNoEncontradaComponent {
  constructor(private _router: Router) { }

  volverAlInicio() {
    this._router.navigate(['/home']);
  }
}
