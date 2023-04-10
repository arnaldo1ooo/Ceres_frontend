import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import {
  DialogoConfirmacionComponent,
} from 'src/app/compartido/componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';

import { Departamento } from '../../model/departamento';
import { DepartamentosService } from '../../services/departamentos.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  dsDepartamentos$: Observable<Departamento[]>; //Cuando es Observable, colocar $

  constructor(
    private departamentosService: DepartamentosService,
    public dialog: MatDialog,
    private ruta: Router,
    private rutaActual: ActivatedRoute,
    private alertaSnackBar: MatSnackBar) {
    this.dsDepartamentos$ = this.cargarDepartamentos();
  }

  abrirDialogoError(msgError: string) {
    this.dialog.open(DialogoErrorComponent, { data: msgError });
  }

  ngOnInit(): void {

  }

  refrescar() {
    this.dsDepartamentos$ = this.cargarDepartamentos();
  }

  onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  onNuevo() {
    this.ruta.navigate(['nuevo'], { relativeTo: this.rutaActual }); //Para que navegue a esa direccion
  }

  onVisualizar(departamento: Departamento) {
    this.ruta.navigate(['visualizar', departamento._id], { relativeTo: this.rutaActual });
  }

  onEditar(departamento: Departamento) {
    this.ruta.navigate(['editar', departamento._id], { relativeTo: this.rutaActual }); //Navega a esa direccion con los datos del departamento
  }

  onEliminar(departamento: Departamento) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea eliminar esta departamento?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this.departamentosService.eliminar(departamento._id).subscribe(
          () => {
            this.refrescar();
            this.alertaSnackBar.open('Departamento eliminado con suceso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Error al intentar eliminar departamento.')
        );
      }
    });
  }

  onInactivar(departamento: Departamento) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea inactivar esta departamento?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this.departamentosService.inactivar(departamento._id).subscribe(
          () => {
            this.refrescar();
            this.alertaSnackBar.open('Departamento inactivado con suceso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Error al intentar inactivar departamento.')
        );
      }
    });
  }

  cargarDepartamentos() {
    return this.departamentosService.listarTodosDepartamentosActivos()
      .pipe(catchError(error => {
        this.abrirDialogoError('Error al cargar lista de Departamentos');

        return of([]) //Retorna un array vacio para detener el spinner cuando hay error
      })
      );
  }

}
