import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import {
  DialogoConfirmacionComponent,
} from 'src/app/compartido/componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';

import { Filial } from '../../model/filial';
import { FilialesService } from '../../services/filiales.service';

@Component({
  selector: 'app-filiales',
  templateUrl: './filiales.component.html',
  styleUrls: ['./filiales.component.scss']
})
export class FilialesComponent implements OnInit {

  dsFiliales$: Observable<Filial[]>; //Cuando es Observable, colocar $
  filiales$: Observable<Filial[]> | null = null;

  constructor(
    private filialesService: FilialesService,
    public dialog: MatDialog,
    private ruta: Router,
    private rutaActual: ActivatedRoute,
    private alertaSnackBar: MatSnackBar) {
    this.dsFiliales$ = this.filialesService.listarTodosFilialesActivos()
      .pipe(catchError(error => {
        this.abrirDialogoError('Error al cargar lista de Filiales');

        return of([]) //Retorna un array vacio para detener el spinner cuando hay error
      })
      );
  }

  abrirDialogoError(msgError: string) {
    this.dialog.open(DialogoErrorComponent, { data: msgError });
  }

  ngOnInit(): void {

  }

  refrescar() {
    this.filiales$ = this.filialesService.listarTodosFiliales()
      .pipe(
        catchError(error => {
          this.onError('Error al cargar filiales.');
          return of([])
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  onNuevo() {
    this.ruta.navigate(['nuevo'], { relativeTo: this.rutaActual }); //Para que navegue a esa direccion
  }

  onEditar(filial: Filial) {
    this.ruta.navigate(['editar', filial._id], { relativeTo: this.rutaActual }); //Navega a esa direccion con los datos del filial
  }

  onEliminar(filial: Filial) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea eliminar esta filial?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this.filialesService.eliminar(filial._id).subscribe(
          () => {
            this.refrescar();
            this.alertaSnackBar.open('Filial eliminado con suceso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Error al intentar eliminar filial.')
        );
      }
    });
  }

  onInactivar(filial: Filial) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea inactivar esta filial?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this.filialesService.inactivar(filial._id).subscribe(
          () => {
            this.refrescar();
            this.alertaSnackBar.open('Filial inactivado con suceso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Error al intentar inactivar filial.')
        );
      }
    });
  }



}
