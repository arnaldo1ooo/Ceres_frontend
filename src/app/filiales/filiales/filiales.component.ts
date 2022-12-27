import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Filial } from '../model/filial';
import { ErrorDialogoComponent } from '../../compartido/components/error-dialogo/error-dialogo.component';
import { FilialesService } from './../services/filiales.service';

@Component({
  selector: 'app-filiales',
  templateUrl: './filiales.component.html',
  styleUrls: ['./filiales.component.scss']
})
export class FilialesComponent implements OnInit {

  filiales$: Observable<Filial[]>;
  columnasVisibles = ['_id', 'nombre', 'sucursal', 'situacion'];

  constructor(
    private filialesService: FilialesService,
    public dialogo: MatDialog
    ) {
    this.filiales$ = this.filialesService.listaAllFiliales()
    .pipe(
      catchError(error => {
        console.log(error);
        this.onError('Error al cargar filiales');

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
