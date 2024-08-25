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
import { Entidad } from '../../models/entidad.model';
import { ApiPageRequest } from 'src/app/compartido/interfaces/api-page-request';
import { DEFAULT_ORDENAR_POR, DEFAULT_PAGE_TAMANHO, ID_OPCION_TODOS, PAGE_INICIAL } from 'src/app/compartido/constantes/constantes';
import { Orden } from 'src/app/compartido/enums/orden.enum';
import { EntidadFiltroDTO } from '../../models/dtos/entidadFiltroDTO';
import { Situacion, SituacionUtils } from 'src/app/compartido/enums/situacion.enum';
import { ClaseEntidad, ClaseEntidadUtils } from '../../enums/clase-entidad.enum';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { SucursalesService } from 'src/app/modulos/sucursales/services/sucursales.service';
import { Sucursal } from 'src/app/modulos/sucursales/model/sucursal.model';
import { ApiPageResponse } from 'src/app/compartido/interfaces/api-page-response';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent implements OnInit {

  protected listEntidades$: Observable<Entidad[]> | null = of([]);
  protected listClasesEntidad = Object.values(ClaseEntidad);
  protected claseEntidadUtils = ClaseEntidadUtils;
  protected listSituaciones = Object.values(Situacion);
  protected situacionUtils = SituacionUtils;
  protected listSucursales: any;
  protected entidadFiltro: EntidadFiltroDTO = this.filtroInicial();
  protected isFiltrando: boolean = false;
  protected apiPageResponse!: ApiPageResponse;

  protected apiPageRequestDefault: ApiPageRequest = {
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
    private alertaSnackBar: MatSnackBar,
    private _sucursalService: SucursalesService,) {

  }

  abrirDialogoError(msgError: string) {
    this.dialog.open(DialogoErrorComponent, { data: msgError });
  }

  ngOnInit(): void {
    this.listarSucursales();
    this.filtrar();
  }

  refrescar(page: ApiPageRequest) {
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

  onInactivar(entidad: Entidad) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea inactivar esta entidad?',
    });

    dialogoRef.afterClosed().subscribe({
      next: (respuesta: boolean) => {
        if (respuesta) {
          this._entidadesService.inactivar(entidad._id!).subscribe({
            next: () => {
              this.refrescar(this.apiPageRequestDefault);
              this.alertaSnackBar.open('Entidad inactivada con exito!', 'X', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            },
            error: () => this.onError('Error al intentar inactivar entidad.')
          });
        }
      },
      error: (err) => this.onError('Error al cerrar el diálogo.')
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

  protected listarEntidadesPage(entidadFiltro: EntidadFiltroDTO, pageRequest: ApiPageRequest) {
    this.isFiltrando = true;
    this.listEntidades$ = null;

    this._entidadesService.listarTodosEntidadesFiltroPage(entidadFiltro, pageRequest)
      .pipe(finalize(() => {
        this.isFiltrando = false;
      }))
      .subscribe({
        next: response => {
          this.apiPageResponse = response;
          this.listEntidades$ = of(response.data.content || []);  //of convierte a Observables
        },
        error: err => {
          this.listEntidades$ = of([]);
          this.abrirDialogoError('Error al cargar lista de Entidades');
        }
      })
  }

  public filtrar() {
    this.refrescar(this.apiPageRequestDefault);
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
      ciRuc: null,
      idSituacion: Situacion.ACTIVO
    };
  }

  private listarSucursales() {
    this._sucursalService.listarTodosSucursales().subscribe((lista: Sucursal[]) => {
      this.listSucursales = lista;
    })
  }

  protected compararOpcionesSelect(opcion: any, opcionSeleccionada: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionSeleccionada);
  }

}
