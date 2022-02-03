import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Departamento } from '../model/departamento';
import { ErrorDialogoComponent } from './../../compartido/components/error-dialogo/error-dialogo.component';
import { DepartamentosService } from './../services/departamentos.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  departamentos$: Observable<Departamento[]>;
  columnasVisibles = ['id', 'nombre', 'sucursal', 'situacion'];

  constructor(
    private departamentosService: DepartamentosService,
    public dialogo: MatDialog
    ) {
    this.departamentos$ = this.departamentosService.listaAllDepartamentos()
    .pipe(
      catchError(error => {
        console.log(error);
        this.onError('Error al cargar departamentos');

        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialogo.open(ErrorDialogoComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

}
