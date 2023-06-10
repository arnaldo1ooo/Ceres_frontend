import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModoEdicion } from 'src/app/compartido/enums/modoEdicion.enum';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';

import { TipoMercaderia } from '../../enums/tipoMercaderia.enum';
import { Mercaderia } from '../../model/mercaderia';
import { MercaderiasService } from '../../services/mercaderias.service';
import { AvisoHelpersService } from './../../../../compartido/services/aviso-helpers.service';
import { ErrorHelpersService } from './../../../../compartido/services/error-helpers.service';

@Component({
  selector: 'app-mercaderia-form',
  templateUrl: './mercaderia-form.component.html',
  styleUrls: ['./mercaderia-form.component.scss']
})
export class MercaderiaFormComponent implements OnInit {
  public listaTiposMercaderia = Object.values(TipoMercaderia);
  public listaDepartamentos: any;
  public listaSituaciones = Object.values(Situacion);
  public modoEdicion: string = this._ruta.snapshot.data['modoEdicion']; //Proviene del routing
  public formGroupMercaderia = this.formMercaderiaInicial();

  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _mercaderiaService: MercaderiasService,
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _departamentosService: DepartamentosService,
    private _avisoHelpersService: AvisoHelpersService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.verificarModoEdicion();

    this.listaDepartamentos = this.listarDepartamentos();

    const mercaderia: Mercaderia = this._ruta.snapshot.data['mercaderia'];  //Obtiene el objeto del resolver

    this.formGroupMercaderia.setValue({ //Setamos los datos para que aparezca al editar
      _id: mercaderia._id,
      descripcion: mercaderia.descripcion,
      tipo: mercaderia.tipo,
      departamento: mercaderia.departamento,
      situacion: HelpersService.isNoNuloYNoVacio(mercaderia.situacion)
        ? mercaderia.situacion
        : Situacion.ACTIVO //Se pone por default Activo
    });
  }

  private verificarModoEdicion() {
    switch (this.modoEdicion) {
      case ModoEdicion.MODO_NUEVO:
        this.formGroupMercaderia.get('situacion')?.disable(); //Se deshabilita campo Situacion
        break;

      case ModoEdicion.MODO_EDITAR:
        this.formGroupMercaderia.get('situacion')?.disable();
        break;

      case ModoEdicion.MODO_VISUALIZAR:
        this.formGroupMercaderia.disable();
        break;
    }
  }

  public onGuardar() {
    if (this.formGroupMercaderia.valid) { //Verifica los validators de cada campo del form
      this._mercaderiaService.guardar(this.formGroupMercaderia.getRawValue()) //getRawValue incluye los campos disabled
        .subscribe(resultado => this.onExito(), error => this.onError());
    }
    else {
      this.formGroupMercaderia.markAllAsTouched(); //Marca todos los campos invalidos
      this._avisoHelpersService.mostrarMensajeDatosInvalidosForm();
    }
  }

  public onCancelar() {
    this._location.back(); //Para que retroceda de pagina
  }

  private onExito() {
    this._avisoHelpersService.mostrarMensaje('Mercaderia guardado con exito!', '', 4000);  //Mensaje cuando salva correctamente
    this.onCancelar(); //Para que vuelva atras
  }

  private onError() {
    this._avisoHelpersService.mostrarMensaje('Error al guardar mercaderia', '', 4000); //Mensaje cuando da error
  }

  protected compararOpcionesSelect(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionRecibida);
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.formGroupMercaderia.get(nombreCampo); //Obtenemos el elemento
    return ErrorHelpersService.verificarMensajeError(campo);
  }

  private listarDepartamentos() {
    this._departamentosService.listarTodosDepartamentos().subscribe((respuesta: any) => {
      this.listaDepartamentos = respuesta;
    })
  }

  private formMercaderiaInicial(): FormGroup {
    return this._formBuilder.group({
      _id: new FormControl(''),  //Sirve para el modo editar
      descripcion: new FormControl('', [
        Validators.required, //Los validators sirven para agregar validaciones al campo
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      tipo: new FormControl('', [
        Validators.required
      ]),
      departamento: new FormControl('', [
        Validators.required
      ]),
      situacion: new FormControl('', [
        Validators.required
      ])
    });
  }
}
