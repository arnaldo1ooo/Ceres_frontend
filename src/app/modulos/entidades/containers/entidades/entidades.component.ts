import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import {
  DialogoConfirmacionComponent,
} from 'src/app/compartido/componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { EntidadesService } from '../../services/entidades.service';
import { Entidad } from '../../models/entidad';
import { EntidadListaDTO } from '../../models/dtos/entidadListaDTO';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent implements OnInit {

  dsEntidades$: Observable<EntidadListaDTO[]>; //Cuando es Observable, colocar $

  constructor(
    private entidadesService: EntidadesService,
    public dialog: MatDialog,
    private ruta: Router,
    private rutaActual: ActivatedRoute,
    private alertaSnackBar: MatSnackBar) {
    this.dsEntidades$ = this.cargarEntidades();
  }

  abrirDialogoError(msgError: string) {
    this.dialog.open(DialogoErrorComponent, { data: msgError });
  }

  ngOnInit(): void {

  }

  refrescar() {
    this.dsEntidades$ = this.cargarEntidades();
  }

  onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  onNuevo() {
    this.ruta.navigate(['nuevo'], { relativeTo: this.rutaActual }); //Para que navegue a esa direccion
  }

  onVisualizar(entidad: Entidad) {
    this.ruta.navigate(['visualizar', entidad._id], { relativeTo: this.rutaActual });
  }

  onEditar(entidad: Entidad) {
    this.ruta.navigate(['editar', entidad._id], { relativeTo: this.rutaActual }); //Navega a esa direccion con los datos del departamento
  }

  onEliminar(entidad: Entidad) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea eliminar esta entidad?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      /*if (respuesta) {
        this.entidadesService.eliminar(entidad._id).subscribe(
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
      }*/
    });
  }

  onInactivar(entidad: Entidad) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea inactivar esta departamento?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      /*if (respuesta) {
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
      }*/
    });
  }

  cargarEntidades() {
    return this.entidadesService.listarTodosEntidades()
      .pipe(catchError(error => {
        this.abrirDialogoError('Error al cargar lista de Entidades');

        return of([]) //Retorna un array vacio para detener el spinner cuando hay error
      })
      );
  }

}
