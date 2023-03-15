import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  DialogoConfirmacionComponent,
} from 'src/app/compartido/componentes/dialogo-confirmacion/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErrorComponent } from 'src/app/compartido/componentes/dialogo-error/dialogo-error.component';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';

import { Mercaderia } from '../../model/mercaderia';
import { MercaderiasService } from '../../services/mercaderias.service';
import { Orden } from './../../../../compartido/enums/orden.enum';
import { Page } from './../../model/mercaderia';

@Component({
  selector: 'app-mercaderias',
  templateUrl: './mercaderias.component.html',
  styleUrls: ['./mercaderias.component.scss']
})
export class MercaderiasComponent implements OnInit {

  listMercaderias$: Observable<Mercaderia[]> | undefined; //El $ indica que es Observable
  pageRes: Page | undefined;

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
    private alertaSnackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.listarMercaderiasPage(null, this.pageRequestDefault);
  }


  abrirDialogoError(msgError: string) {
    this.dialog.open(DialogoErrorComponent, { data: msgError });
  }


  refrescar() {
    this.listarMercaderiasPage(null, this.pageRequestDefault);
  }

  onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  onNuevo() {
    this.ruta.navigate(['nuevo'], { relativeTo: this.rutaActual }); //Para que navegue a esa direccion
  }

  onVisualizar(mercaderia: Mercaderia) {
    this.ruta.navigate(['visualizar', mercaderia._id], { relativeTo: this.rutaActual });
  }

  onEditar(mercaderia: Mercaderia) {
    this.ruta.navigate(['editar', mercaderia._id], { relativeTo: this.rutaActual }); //Navega a esa direccion con los datos del filial
  }

  onEliminar(mercaderia: Mercaderia) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea eliminar esta mercaderia?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this.mercaderiasService.eliminar(mercaderia._id).subscribe(
          () => {
            this.refrescar();
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

  onInactivar(mercaderia: Mercaderia) {
    const dialogoRef = this.dialog.open(DialogoConfirmacionComponent, {
      data: '¿Seguro que desea inactivar esta mercaderia?',
    });

    dialogoRef.afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta) {
        this.mercaderiasService.inactivar(mercaderia._id).subscribe(
          () => {
            this.refrescar();
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

  listarMercaderiasPage(id: any, pageRequest: PageRequest) {
    this.mercaderiasService.listarTodosMercaderiasFiltroPage(id, pageRequest).subscribe(respuesta => {
      this.pageRes = respuesta;
      this.listMercaderias$ = of(this.pageRes.content);  //of convierte a Observable
    });
  }

}
