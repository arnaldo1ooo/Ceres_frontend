import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_PAGE_TAMANHOS } from 'src/app/compartido/constantes/constantes';
import { PageRequest } from 'src/app/compartido/interfaces/page-request';
import { EntidadesComponent } from '../../containers/entidades/entidades.component';
import { EntidadListaDTO } from '../../models/dtos/entidadListaDTO';
import { Entidad, Page } from '../../models/entidad';

@Component({
  selector: 'app-entidades-lista',
  templateUrl: './entidades-lista.component.html',
  styleUrls: ['./entidades-lista.component.scss']
})
export class EntidadesListaComponent implements OnInit {
  @Input() listEntidades: Entidad[] = [];
  @Input() pageResponse: Page | undefined;
  @Input() pageRequest!: PageRequest; //Recibe el request default
  @Output() nuevo = new EventEmitter(false);
  @Output() visualizar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() eliminar = new EventEmitter(false);
  @Output() inactivar = new EventEmitter(false);

  @ViewChild(MatPaginator) paginador: MatPaginator | undefined;

  readonly columnasAMostrar = ['_id', 'nombreApellido', 'sucursal', 'situacion', 'acciones'];
  protected tamanhosPage = DEFAULT_PAGE_TAMANHOS;

  constructor(private _entidadesComponent: EntidadesComponent) { }

    ngOnInit(): void {

    }

  onNuevo() {
    this.nuevo.emit(true);
  }

  onVisualizar(entidadListaDTO: EntidadListaDTO) {
    this.visualizar.emit(entidadListaDTO);
  }

  onEditar(entidad: Entidad) {
    this.editar.emit(entidad);
  }

  onEliminar(entidad: Entidad) {
    this.eliminar.emit(entidad);
  }

  onInactivar(entidad: Entidad) {
    this.inactivar.emit(entidad);
  }

  onCambiarPage(event: PageEvent) {
    if(this.listEntidades.length > 0) {
      this.pageRequest.pagina = event.pageIndex; //Asignamos el numero de pagina
      this.pageRequest.tamanho = event.pageSize;  //Asignamos el tamaño de las pagina

      this._entidadesComponent.refrescar(this.pageRequest);
    }
  }

}
