import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, of } from 'rxjs';
import {
  DialogoConfirmacionComponent,
} from 'src/app/compartido/componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import {
  DEFAULT_ORDENAR_POR,
  DEFAULT_PAGE_TAMANHO,
  ID_OPCION_TODOS,
  PAGE_INICIAL,
} from 'src/app/compartido/constantes/constantes';
import { Situacion, SituacionUtils } from 'src/app/compartido/enums/situacion.enum';
import { ApiPageRequest } from 'src/app/compartido/interfaces/api-page-request';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { Departamento } from 'src/app/modulos/departamentos/model/departamento.model';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';
import { LoginService } from 'src/app/modulos/login/services/login.service';
import { TiposMovimientoService } from 'src/app/modulos/tipos-movimiento/services/tipos-movimiento.service';

import { Orden } from '../../../../compartido/enums/orden.enum';
import { MovimientoFiltroDTO } from '../../model/dtos/movimientoFiltroDTO';
import { MovimientoListaDTO, Page } from '../../model/dtos/movimientoListaDTO';
import { MovimientosService } from '../../services/movimientos.service';
import { FechaHelpersService } from './../../../../compartido/services/fecha-helpers.service';
import { TipoMovimiento } from './../../../tipos-movimiento/models/tipo-movimiento';
import { DialogoGenerarReporteComponent } from '../../../../compartido/componentes/dialogo-generar-reporte/dialogo-generar-reporte.component';
import { Reporte } from 'src/app/compartido/enums/reporte.enum';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {

  protected listMovimientosListaDTO$: Observable<MovimientoListaDTO[]> | null = of([]); //El $ indica que es Observable, se inicializa con array vacio, acepta Observable o null
  protected listaTiposMovimiento: TipoMovimiento[] = [];
  protected listaDepartamentos: Departamento[] = [];
  protected listaKeySituaciones = Object.values(Situacion);
  protected situacionUtils = SituacionUtils;
  protected movimientoFiltro: MovimientoFiltroDTO = new MovimientoFiltroDTO();
  protected isMostrarTiposMovimientoSeleccion = false;
  protected isFiltrando: boolean = false;
  protected pageRes: Page | undefined;


  //Inicializamos el pageRequest default, seria la paginacion inicial
  protected apiPageRequestDefault: ApiPageRequest = {
    pagina: PAGE_INICIAL,
    tamanho: DEFAULT_PAGE_TAMANHO,
    ordenarPor: DEFAULT_ORDENAR_POR,
    orden: Orden.DESCENDENTE
  };

  constructor(
    protected dialog: MatDialog,
    private _ruta: Router,
    private _rutaActual: ActivatedRoute,
    private _alertaSnackBar: MatSnackBar,
    private _movimientosService: MovimientosService,
    private _tiposMovimientoService: TiposMovimientoService,
    private _departamentosService: DepartamentosService,
    private _loginService: LoginService
  ) {

  }

  ngOnInit(): void {
    this.listarTiposMovimiento();
    this.listarDepartamentos();
    this.recuperarFiltrosDeSesion();
    this.filtrar();
  }

  private recuperarFiltrosDeSesion() {
    const filtrosGuardados = sessionStorage.getItem('movimientoFiltros');
    
    this.movimientoFiltro = filtrosGuardados 
                            ? JSON.parse(filtrosGuardados) 
                            : this.filtroInicial();
  }

  protected abrirDialogoError(msgError: string) {
    this.dialog.open(DialogoErrorComponent, { data: msgError });
  }

  public refrescar(page: ApiPageRequest) {
    this.listarMovimientosListaPage(this.movimientoFiltro, page);
  }

  protected filtrar() {
    HelpersService.salvarItemEnSessionStorage('movimientoFiltros', JSON.stringify(this.movimientoFiltro));
    this.refrescar(this.apiPageRequestDefault);
  }

  protected limpiar() {
    this.limpiarFiltros();
    this.listMovimientosListaDTO$ = of([]);
  }

  protected generarReporte(reporteSeleccionado: string) {
    switch (reporteSeleccionado) {
      case Reporte.LIBRO_DIARIO_POR_ITEM: {
        this.abrirDialogoGenerarReporte(Reporte.LIBRO_DIARIO_POR_ITEM);
        break;
      }
      default: {
        break;
      }
    }
  }

  protected abrirDialogoGenerarReporte(reporteSel: Reporte) {
    const dialogoGenerarReporte = this.dialog.open(
      DialogoGenerarReporteComponent,
      { data: { reporteSeleccionado: reporteSel } }
    );

    dialogoGenerarReporte.afterClosed().subscribe(result => {
      //Al cerrar dialogo
    });
  }

  protected limpiarFiltros() {
    HelpersService.removerItemDelSessionStorage('movimientoFiltros');
    this.movimientoFiltro = this.filtroInicial();
  }

  protected limpiarFiltrosExceptoId() {
    this.movimientoFiltro.idTipo = ID_OPCION_TODOS;
    this.movimientoFiltro.nombreApellidoEntidad = null;
    this.movimientoFiltro.fechaInicial = null;
    this.movimientoFiltro.fechaFinal = null;
    this.movimientoFiltro.keySituacion = ID_OPCION_TODOS;
    this.movimientoFiltro.idDepartamento = ID_OPCION_TODOS;
    this.movimientoFiltro.keySituacion = ID_OPCION_TODOS;
  }

  private filtroInicial() {
    //Valores por default del filtro, -1 seria opcion TODOS por defecto
    return this.movimientoFiltro = {
      id: "",
      idTipo: ID_OPCION_TODOS,
      nombreApellidoEntidad: "",
      fechaInicial: FechaHelpersService.getPrimerDiaDelAnho(),
      fechaFinal: new Date(),
      idDepartamento: this._loginService.getIdDepartamentoLogado(),
      keySituacion: Situacion.ACTIVO
    };
  }

  protected onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  protected onNuevo() {
    this._ruta.navigate(['nuevo'], { relativeTo: this._rutaActual });
  }

  protected onMostrarTiposMovimientoSeleccion() {
    this.isMostrarTiposMovimientoSeleccion = true;
  }

  protected onVisualizar(movimientoListaDTO: MovimientoListaDTO) {
    this._ruta.navigate(['visualizar', movimientoListaDTO._id], { relativeTo: this._rutaActual });
  }

  protected onEditar(movimientoListaDTO: MovimientoListaDTO) {
    this._ruta.navigate(['editar', movimientoListaDTO._id], { relativeTo: this._rutaActual }); //Navega a esa direccion con los datos del departamento
  }

  protected onEliminar(movimientoListaDTO: MovimientoListaDTO) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea eliminar este movimiento?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this._movimientosService.eliminar(movimientoListaDTO._id).subscribe(
          () => {
            this.refrescar(this.apiPageRequestDefault);
            this._alertaSnackBar.open('Movimiento eliminado con suceso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Error al intentar eliminar movimiento.')
        );
      }
    });
  }

  protected onInactivar(movimientoListaDTO: MovimientoListaDTO) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea inactivar este movimiento?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this._movimientosService.inactivar(movimientoListaDTO._id).subscribe(
          () => {
            this.refrescar(this.apiPageRequestDefault);
            this._alertaSnackBar.open('Movimiento inactivado con suceso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Error al intentar inactivar movimiento.')
        );
      }
    });
  }

  protected listarMovimientosListaPage(movimientoFiltro: MovimientoFiltroDTO, apiPageRequest: ApiPageRequest) {
    this.isFiltrando = true;
    this.listMovimientosListaDTO$ = null; //Dejar la lista en null, para que muestre el componente cargando

    this._movimientosService.listarTodosMovimientosListaFiltroPage(movimientoFiltro, apiPageRequest)
      .pipe(finalize(() => {  //Se ejecuta al finalizar el subscribe
        this.isFiltrando = false;
      }))
      .subscribe({
        next: respuesta => {
          this.pageRes = respuesta;
          this.listMovimientosListaDTO$ = of(this.pageRes!.content);  //of convierte a Observables
        },
        error: err => {
          this.listMovimientosListaDTO$ = of([]); //Se asigna una lista vacia, para que el componente cargando se detenga
          this.abrirDialogoError('Error al cargar lista de Movimientos');
        }
      })
  }

  protected compararOpcionesSelect(opcion: any, opcionSeleccionada: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionSeleccionada);
  }

  private listarTiposMovimiento() {
    this._tiposMovimientoService.listarTodosTiposMovimiento().subscribe((respuesta: any) => {
      this.listaTiposMovimiento = respuesta;
    })
  }

  private listarDepartamentos() { //Cargamos la lista de sucursales para mostrar en el dropdown
    this._departamentosService.listarTodosDepartamentos().subscribe((respuesta: any) => {
      this.listaDepartamentos = respuesta;
    })
  }

}

