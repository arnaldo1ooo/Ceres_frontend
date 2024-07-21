import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, Observable, of } from 'rxjs';
import {
  DialogoConfirmacionComponent,
} from 'src/app/compartido/componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { EntidadesService } from '../../services/entidades.service';
import { Entidad, Page } from '../../models/entidad';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { DEFAULT_ORDENAR_POR, DEFAULT_PAGE_TAMANHO, ID_OPCION_TODOS, PAGE_INICIAL } from 'src/app/compartido/constantes/constantes';
import { Orden } from 'src/app/compartido/enums/orden.enum';
import { EntidadFiltroDTO } from '../../models/dtos/entidadFiltroDTO';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent implements OnInit {

  protected listEntidades$: Observable<Entidad[]> | null = of([]);
  protected entidadFiltro: EntidadFiltroDTO = this.filtroInicial();
  protected isFiltrando: boolean = false;
  protected pageRes: Page | undefined;

  protected pageRequestDefault: PageRequest = {
    pagina: PAGE_INICIAL,
    tamanho: DEFAULT_PAGE_TAMANHO,
    ordenarPor: DEFAULT_ORDENAR_POR,
    orden: Orden.DESCENDENTE
  };

  constructor(
    private _entidadesService: EntidadesService,
    public dialog: MatDialog,
    private ruta: Router,
    private rutaActual: ActivatedRoute,
    private alertaSnackBar: MatSnackBar) {

    }

  abrirDialogoError(msgError: string) {
    this.dialog.open(DialogoErrorComponent, { data: msgError });
  }

  ngOnInit(): void {

  }

  refrescar(page: PageRequest) {
    this.listarEntidadesPage(this.entidadFiltro, page);
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

  listarEntidades() {
    return this._entidadesService.listarTodosEntidades()
      .pipe(catchError(error => {
        this.abrirDialogoError('Error al cargar lista de Entidades');

        return of([]) //Retorna un array vacio para detener el spinner cuando hay error
      })
      );
  }

  protected listarEntidadesPage(entidadFiltro: EntidadFiltroDTO, pageRequest: PageRequest) {
    this.isFiltrando = true;
    this.listEntidades$ = null;

    this._entidadesService.listarTodosEntidadesFiltroPage(entidadFiltro, pageRequest)
      .pipe(finalize(() => {
        this.isFiltrando = false;
      }))
      .subscribe({
        next: respuesta => {
          this.pageRes = respuesta;
          this.listEntidades$ = of(this.pageRes!.content);  //of convierte a Observables
        },
        error: err => {
          this.listEntidades$ = of([]);
          this.abrirDialogoError('Error al cargar lista de Entidades');
        }
      })
  }

  public filtrar() {
    this.refrescar(this.pageRequestDefault);
  }

  protected limpiar() {
    this.limpiarFiltros();
    this.listEntidades$ = of([]);
  }

  protected limpiarFiltros() {
    this.entidadFiltro = this.filtroInicial();
  }

  protected limpiarFiltrosExceptoId() {
    const idFiltro: Number = this.entidadFiltro.id;  //Salva id ingresado
    this.limpiarFiltros();
    this.entidadFiltro.id = idFiltro;  //Vuelve a agregar filtro ingresado
  }

  private filtroInicial() {
    return this.entidadFiltro = {
      id: null,
      nombreApellido: null,
      idsClase: [],
      idSucursal: ID_OPCION_TODOS,
      ci: null,
      idSituacion: Situacion.ACTIVO
    };
  }

}
