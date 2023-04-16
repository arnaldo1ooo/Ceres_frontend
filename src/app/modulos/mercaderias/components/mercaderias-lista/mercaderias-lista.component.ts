import { MercaderiaFiltroDTO } from '../../model/dtos/mercaderiaFiltroDTO';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';

import { Mercaderia } from '../../model/mercaderia';
import { MercaderiasComponent } from './../../containers/mercaderias/mercaderias.component';
import { Page } from './../../model/mercaderia';
import { DEFAULT_PAGE_TAMANHOS } from 'src/app/compartido/constantes/constantes';


@Component({
  selector: 'app-mercaderias-lista',
  templateUrl: './mercaderias-lista.component.html',
  styleUrls: ['./mercaderias-lista.component.scss']
})
export class MercaderiasListaComponent implements OnInit {

  @Input() listMercaderias: Mercaderia[] = [];
  @Input() pageResponse: Page | undefined;
  @Input() pageRequest!: PageRequest; //Recibe el request default
  @Output() nuevo = new EventEmitter(false);
  @Output() visualizar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() eliminar = new EventEmitter(false);
  @Output() inactivar = new EventEmitter(false);

  @ViewChild(MatPaginator) paginador: MatPaginator | undefined;

  protected readonly columnasAMostrar = ['_id', 'descripcion', 'tipo', 'sucursal', 'situacion', 'acciones'];
  protected tamanhosPage = DEFAULT_PAGE_TAMANHOS;


  constructor(private _mercaderiasComponent: MercaderiasComponent) { }

  ngOnInit(): void {

  }

  onNuevo() {
    this.nuevo.emit(true);
  }

  onVisualizar(mercaderia: Mercaderia) {
    this.visualizar.emit(mercaderia);
  }

  onEditar(mercaderia: Mercaderia) {
    this.editar.emit(mercaderia);
  }

  onEliminar(mercaderia: Mercaderia) {
    this.eliminar.emit(mercaderia);
  }

  onInactivar(mercaderia: Mercaderia) {
    this.inactivar.emit(mercaderia);
  }

  onCambiarPage(event: PageEvent) {
    if(this.listMercaderias.length > 0) {
      this.pageRequest.pagina = event.pageIndex; //Asignamos el numero de pagina
      this.pageRequest.tamanho = event.pageSize;  //Asignamos el tamaño de las pagina

      this._mercaderiasComponent.refrescar(this.pageRequest);
    }
  }

}
