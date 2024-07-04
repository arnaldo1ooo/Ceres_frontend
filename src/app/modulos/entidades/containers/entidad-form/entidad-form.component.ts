import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { AvisoHelpersService } from '../../../../compartido/services/aviso-helpers.service';
import { ErrorHelpersService } from '../../../../compartido/services/error-helpers.service';
import { SucursalesService } from '../../../sucursales/services/sucursales.service';
import { EntidadDetalleDTO } from '../../models/dtos/entidadDetalleDTO';
import { EntidadesService } from '../../services/entidades.service';

@Component({
  selector: 'app-entidad-form',
  templateUrl: './entidad-form.component.html',
  styleUrls: ['./entidad-form.component.scss']
})
export class EntidadFormComponent implements OnInit {
  listaSucursales: any;
  listaSituaciones = Object.values(Situacion);

  formEntidad = this._formBuilder.group({
    _id: [''],  //Sirve para el modo editar
    descripcion: ['', [
      Validators.required, //Los validators sirven para agregar validaciones al campo
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    sucursal: ['', [
      Validators.required
    ]],
    situacion: ['', [
      Validators.required
    ]]
  });

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _entidadService: EntidadesService,
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _sucursalService: SucursalesService,
    private _avisoHelpersService: AvisoHelpersService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.cargarSelectSucursal();
    this.verificarModo();

    const entidadDetalleDTO: EntidadDetalleDTO = this._ruta.snapshot.data['entidad'];  //Obtiene el objeto entidad del resolver

    this.formEntidad.setValue({ //Setamos los datos del departamento para que aparezca al editar
      _id: entidadDetalleDTO._id,
      descripcion: entidadDetalleDTO.descripcion,
      sucursal: entidadDetalleDTO.sucursal,
      situacion: HelpersService.isNoNuloYNoVacio(entidadDetalleDTO.situacion) ? entidadDetalleDTO.situacion : Situacion.ACTIVO //Se pone por default Activo
    });
  }

  public onGuardar() {
    if (this.formEntidad.valid) { //Verifica los validators de cada campo del form
      /*this._departamentoService.guardar(this.formEntidad.getRawValue())
        .subscribe(resultado => this.onExito(), error => this.onError());*/
    }
    else {
      this.formEntidad.markAllAsTouched(); //Marca todos los campos invalidos
      this._avisoHelpersService.mostrarMensajeDatosInvalidosForm();
    }
  }

  public onRetroceder() {
    this._location.back(); //Para que retroceda de pagina
  }

  private onExito() {
    this._avisoHelpersService.mostrarMensaje('Departamento guardado con exito!', '', 4000)
    this.onRetroceder(); //Para que vuelva atras
  }

  private onError() {
    this._avisoHelpersService.mostrarMensaje('Error al guardar departamento', '', 4000);
  }

  private cargarSelectSucursal() {
    this._sucursalService.listarTodosSucursales().subscribe((lista: any) => {  //Cargamos la lista de sucursales para mostrar en el dropdown
      this.listaSucursales = lista;
    })
  }

  protected compararOpcionesSelect(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionRecibida);
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.formEntidad.get(nombreCampo); //Obtenemos el elemento
    ErrorHelpersService.verificarMensajeError(campo);
  }

  public verificarModo() {
    if (this.isPathModoVisualizar()) {
      this.formEntidad.disable();
    }
  }

  public isPathModoVisualizar(): boolean {
    return HelpersService.isPathModoVisualizar(this._ruta.snapshot.routeConfig?.path);
  }




}
