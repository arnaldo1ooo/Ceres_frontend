import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  DialogoConfirmacionComponent,
} from 'src/app/compartido/componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { Situacion, SituacionUtils } from 'src/app/compartido/enums/situacion.enum';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { SucursalesService } from 'src/app/modulos/sucursales/services/sucursales.service';

import { TipoMercaderia, TipoMercaderiaUtils } from '../../enums/tipoMercaderia.enum';
import { Mercaderia } from '../../model/mercaderia';
import { MercaderiaFiltro } from '../../model/mercaderiaFiltro';
import { MercaderiasService } from '../../services/mercaderias.service';
import { Orden } from './../../../../compartido/enums/orden.enum';
import { Page } from './../../model/mercaderia';

@Component({
  selector: 'app-mercaderias',
  templateUrl: './mercaderias.component.html',
  styleUrls: ['./mercaderias.component.scss']
})
export class MercaderiasComponent implements OnInit {

  protected listMercaderias$: Observable<Mercaderia[]> = of([]); //El $ indica que es Observable, se inicializa con array vacio
  protected listaTiposMercaderia = Object.values(TipoMercaderia);
  protected listaSucursales: any;
  protected listaSituaciones = Object.values(Situacion);
  protected tipoMercaderiaUtils = TipoMercaderiaUtils;
  protected situacionUtils = SituacionUtils;
  protected pageRes: Page | undefined;
  protected mercaderiaFiltro: MercaderiaFiltro = this.filtroInicial();

  //Inicializamos el pageRequest default, seria la paginacion inicial
  pageRequestDefault: PageRequest = {
    pagina: 0,
    tamanho: 10,
    ordenarPor: 'id',
    orden: Orden.ASCENDENTE
  };

  constructor(
    private mercaderiasService: MercaderiasService,
    public dialog: MatDialog,
    private ruta: Router,
    private rutaActual: ActivatedRoute,
    private alertaSnackBar: MatSnackBar,
    private sucursalService: SucursalesService) {

  }

  ngOnInit(): void {
    this.listarSucursales();
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

  protected limpiarFiltros() {
    this.mercaderiaFiltro = this.filtroInicial();
  }

  private filtroInicial() {
    return this.mercaderiaFiltro = {
      id: null,
      descripcion: null,
      idTipo: "-1", //Opcion TODOS por defecto
      idSucursal: "-1",
      idSituacion: "-1" //Opcion TODOS por defecto
    };
  }

  protected onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  protected onNuevo() {
    this.ruta.navigate(['nuevo'], { relativeTo: this.rutaActual }); //Para que navegue a esa direccion
  }

  protected onVisualizar(mercaderia: Mercaderia) {
    this.ruta.navigate(['visualizar', mercaderia._id], { relativeTo: this.rutaActual });
  }

  protected onEditar(mercaderia: Mercaderia) {
    this.ruta.navigate(['editar', mercaderia._id], { relativeTo: this.rutaActual }); //Navega a esa direccion con los datos del filial
  }

  protected onEliminar(mercaderia: Mercaderia) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea eliminar esta mercaderia?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this.mercaderiasService.eliminar(mercaderia._id).subscribe(
          () => {
            this.refrescar(this.pageRequestDefault);
            this.alertaSnackBar.open('Mercaderia eliminado con suceso!', 'X', {
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
        this.mercaderiasService.inactivar(mercaderia._id).subscribe(
          () => {
            this.refrescar(this.pageRequestDefault);
            this.alertaSnackBar.open('Mercaderia inactivado con suceso!', 'X', {
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

  protected listarMercaderiasPage(mercaderiaFiltro: MercaderiaFiltro, pageRequest: PageRequest) {
    this.mercaderiasService.listarTodosMercaderiasFiltroPage(mercaderiaFiltro, pageRequest)
      .subscribe({
        next: (respuesta) => {
          this.pageRes = respuesta;
          this.listMercaderias$ = of(this.pageRes!.content);  //of convierte a Observable
        },
        error: (err) => {
          this.listMercaderias$ = of([]); //Se asigna una lista vacia, para que el componente cargando se detenga
          this.abrirDialogoError('Error al cargar lista de Mercaderias');
        }
      })
  }

  protected compararById(opcion: any, opcionSeleccionada: any): boolean {
    return HelpersService.compararById(opcion, opcionSeleccionada);
  }

  private listarSucursales() { //Cargamos la lista de sucursales para mostrar en el dropdown
    this.sucursalService.listarTodosSucursales().subscribe((respuesta: any) => {
      this.listaSucursales = respuesta;
    })
  }

}
