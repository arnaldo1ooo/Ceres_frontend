import { Directive } from '@angular/core';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';

const KEY = 'MAT_SORT';

//Salvar en cache la ultima ordenacion de la columna, para utilizar agregar en el mat-header-cell la directiva guardarSortEnCache
@Directive({
  selector: '[guardarSortEnCache]',
  standalone: true
})
export class GuardarSortEnCacheDirective {

  private soloEnSesionActual: boolean = true;

  constructor(
    private el: MatSort,
  ) { }

  get matSort(): MatSortData {
    console.log("Pruebaa");
    return JSON.parse(this.soloEnSesionActual
      ? sessionStorage.getItem(window.location.pathname + '?' + KEY)!
      : localStorage.getItem(window.location.pathname + '?' + KEY)!);
  }

  set matSort(mat: MatSortData) {
    console.log("Pruebaa 2");
    if (this.soloEnSesionActual) {
      sessionStorage.setItem(window.location.pathname + '?' + KEY, JSON.stringify(mat));
    }
    else {
      localStorage.setItem(window.location.pathname + '?' + KEY, JSON.stringify(mat));
    }
  }

  ngOnInit(): void {
    if (this.matSort) {
      this.el.active = this.matSort.active;
      this.el.direction = this.matSort.direction;
    }
    this.el.sortChange.subscribe((sort: Sort) => {
      this.matSort = {
        active: sort.active,
        direction: sort.direction
      }
    });
  }
}

interface MatSortData {
  active: string;
  direction: SortDirection;
}
