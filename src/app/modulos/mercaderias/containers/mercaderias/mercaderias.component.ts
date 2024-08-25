import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, of } from 'rxjs';
import {
  DialogoConfirmacionComponent,
} from 'src/app/compartido/componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { DEFAULT_ORDENAR_POR, DEFAULT_PAGE_TAMANHO, ID_OPCION_TODOS, PAGE_INICIAL } from 'src/app/compartido/constantes/constantes';
import { Situacion, SituacionUtils } from 'src/app/compartido/enums/situacion.enum';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { ApiPageResponse } from 'src/app/compartido/interfaces/api-page-response';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';

import { TipoMercaderia, TipoMercaderiaUtils } from '../../enums/tipoMercaderia.enum';
import { MercaderiaFiltroDTO } from '../../model/dtos/mercaderiaFiltroDTO';
import { Mercaderia } from '../../model/mercaderia.model';
import { MercaderiasService } from '../../services/mercaderias.service';
import { Orden } from './../../../../compartido/enums/orden.enum';

@Component({
  selector: 'app-mercaderias',
  templateUrl: './mercaderias.component.html',
  styleUrls: ['./mercaderias.component.scss']
})
export class MercaderiasComponent implements OnInit {

  protected listMercaderias$: Observable<Mercaderia[]> | null = of([]); //El $ indica que es Observable, se inicializa con array vacio, acepta Observable o null
  protected listaTiposMercaderia = Object.values(TipoMercaderia);
  protected listaDepartamentos: any;
  protected listaSituaciones = Object.values(Situacion);
  protected tipoMercaderiaUtils = TipoMercaderiaUtils;
  protected situacionUtils = SituacionUtils;
  protected mercaderiaFiltro: MercaderiaFiltroDTO = this.filtroInicial();
  protected isFiltrando: boolean = false;
  protected apiPageResponse!: ApiPageResponse;

  //Inicializamos el pageRequest default, seria la paginacion inicial
  protected pageRequestDefault: PageRequest = {
    pagina: PAGE_INICIAL,
    tamanho: DEFAULT_PAGE_TAMANHO,
    ordenarPor: DEFAULT_ORDENAR_POR,
    orden: Orden.DESCENDENTE
  };

  constructor(
    private _mercaderiasService: MercaderiasService,
    protected dialog: MatDialog,
    private _ruta: Router,
    private _rutaActual: ActivatedRoute,
    private _alertaSnackBar: MatSnackBar,
    private _departamentosService: DepartamentosService) {

  }

  ngOnInit(): void {
    this.listarDepartamentos();
    this.filtrar();
  }

  protected abrirDialogoError(msgError: string) {
    this.dialog.open(DialogoErrorComponent, { data: msgError });
  }

  public refrescar(page: PageRequest) {
    this.listarMercaderiasPage(this.mercaderiaFiltro, page);
  }

  public filtrar() {
    this.refrescar(this.pageRequestDefault);
  }

  protected limpiar() {
    this.limpiarFiltros();
    this.listMercaderias$ = of([]);
  }

  protected limpiarFiltros() {
    this.mercaderiaFiltro = this.filtroInicial();
  }

  protected limpiarFiltrosExceptoId() {
    const idFiltro: Number = this.mercaderiaFiltro.id;  //Salva id ingresado
    this.limpiarFiltros();
    this.mercaderiaFiltro.id = idFiltro;  //Vuelve a agregar filtro ingresado
  }

  private filtroInicial() {
    return this.mercaderiaFiltro = {
      id: null,
      descripcion: null,
      idTipo: ID_OPCION_TODOS, //Opcion TODOS por defecto
      idDepartamento: ID_OPCION_TODOS,
      idSituacion: Situacion.ACTIVO //Opcion TODOS por defecto
    };
  }

  protected onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  protected onNuevo() {
    this._ruta.navigate(['nuevo'], { relativeTo: this._rutaActual }); //Para que navegue a esa direccion
  }

  protected onVisualizar(mercaderia: Mercaderia) {
    this._ruta.navigate(['visualizar', mercaderia._id], { relativeTo: this._rutaActual });
  }

  protected onEditar(mercaderia: Mercaderia) {
    this._ruta.navigate(['editar', mercaderia._id], { relativeTo: this._rutaActual }); //Navega a esa direccion con los datos seleccionados
  }

  protected onEliminar(mercaderia: Mercaderia) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea eliminar esta mercaderia?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this._mercaderiasService.eliminar(mercaderia._id).subscribe(
          () => {
            this.refrescar(this.pageRequestDefault);
            this._alertaSnackBar.open('Mercaderia eliminado con suceso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Error al intentar eliminar mercaderia.')
        );
      }
    });
  }

  protected onInactivar(mercaderia: Mercaderia) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea inactivar esta mercaderia?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this._mercaderiasService.inactivar(mercaderia._id).subscribe(
          () => {
            this.refrescar(this.pageRequestDefault);
            this._alertaSnackBar.open('Mercaderia inactivado con suceso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Error al intentar inactivar mercaderia.')
        );
      }
    });
  }

  protected listarMercaderiasPage(mercaderiaFiltro: MercaderiaFiltroDTO, pageRequest: PageRequest) {
    this.isFiltrando = true;
    this.listMercaderias$ = null; //Dejar la lista en null, para que muestre el componente cargando

    this._mercaderiasService.listarTodosMercaderiasFiltroPage(mercaderiaFiltro, pageRequest)
      .pipe(finalize(() => {  //Se ejecuta al finalizar el subscribe
        this.isFiltrando = false;
      }))
      .subscribe({
        next: respuesta => {
          this.apiPageResponse = respuesta;
          this.listMercaderias$ = of(this.apiPageResponse!.data.content);  //of convierte a Observables
        },
        error: err => {
          this.listMercaderias$ = of([]); //Se asigna una lista vacia, para que el componente cargando se detenga
          this.abrirDialogoError('Error al cargar lista de Mercaderias');
        }
      })
  }

  protected compararOpcionesSelect(opcion: any, opcionSeleccionada: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionSeleccionada);
  }

  private listarDepartamentos() { //Cargamos la lista de sucursales para mostrar en el dropdown
    this._departamentosService.listarTodosDepartamentos().subscribe((respuesta: any) => {
      this.listaDepartamentos = respuesta;
    })
  }

}
