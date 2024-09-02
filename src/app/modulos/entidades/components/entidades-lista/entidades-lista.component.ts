import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_TAMANHOS } from 'src/app/compartido/constantes/constantes';
import { ApiPageRequest } from 'src/app/compartido/interfaces/api-page-request';
import { ApiPageResponse } from 'src/app/compartido/interfaces/api-page-response';
import { EntidadesComponent } from '../../containers/entidades/entidades.component';
import { EntidadListaDTO } from '../../models/dtos/entidadListaDTO';
import { Entidad } from '../../models/entidad.model';

@Component({
  selector: 'app-entidades-lista',
  templateUrl: './entidades-lista.component.html',
  styleUrls: ['./entidades-lista.component.scss']
})
export class EntidadesListaComponent implements OnInit {
  @Input() listEntidades: Entidad[] = [];
  @Input() apiPageResponse!: ApiPageResponse;
  @Input() apiPageRequest!: ApiPageRequest;
  @Output() nuevo = new EventEmitter(false);
  @Output() visualizar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
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

  onInactivar(entidad: Entidad) {
    this.inactivar.emit(entidad);
  }

  onCambiarPage(event: PageEvent) {
    if (this.listEntidades.length > 0) {
      this.apiPageRequest.pagina = event.pageIndex; //Asignamos el numero de pagina
      this.apiPageRequest.tamanho = event.pageSize;  //Asignamos el tamaño de las pagina

      this._entidadesComponent.refrescar(this.apiPageRequest);
    }
  }

}
