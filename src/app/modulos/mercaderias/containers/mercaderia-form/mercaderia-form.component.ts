import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModoEdicion } from 'src/app/compartido/enums/modo-edicion.enum';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';

import { TipoMercaderia } from '../../enums/tipoMercaderia.enum';
import { MercaderiasService } from '../../services/mercaderias.service';
import { AvisoHelpersService } from './../../../../compartido/services/aviso-helpers.service';
import { ErrorHelpersService } from './../../../../compartido/services/error-helpers.service';
import { MercaderiaDetalleDTO } from '../../model/dtos/mercaderiaDetalleDTO';
import { CategoriaMercaderiaDTO } from '../../model/dtos/categoria-mercaderiaDTO';
import { TipoIva } from '../../enums/tipo-iva.enum';

@Component({
  selector: 'app-mercaderia-form',
  templateUrl: './mercaderia-form.component.html',
  styleUrls: ['./mercaderia-form.component.scss']
})
export class MercaderiaFormComponent implements OnInit {
  public listaTiposMercaderia = Object.values(TipoMercaderia);
  public listaDepartamentos: any;
  public listaCategoriasMercaderia!: CategoriaMercaderiaDTO[];
  public listaSituaciones: Situacion[] = Object.values(Situacion);
  public listaTiposIva: TipoIva[] = Object.values(TipoIva);
  public ModoEdicion = ModoEdicion;
  public modoEdicion: string = this._ruta.snapshot.data['modoEdicion']; //Proviene del routing
  public formGroupMercaderia = this.formMercaderiaInicial();
  public imagenVistaPrevia: string | null = null;

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

    this.listarDepartamentos();
    this.listarCategoriasMercaderia();

    const mercaderiaDetalleDTO: MercaderiaDetalleDTO = this._ruta.snapshot.data['mercaderia'];  //Obtiene el objeto del resolver

    this.formGroupMercaderia.setValue({ //Setamos los datos para que aparezca al editar
      _id: mercaderiaDetalleDTO._id,
      descripcion: mercaderiaDetalleDTO.descripcion,
      tipo: mercaderiaDetalleDTO.tipo,
      departamentos: mercaderiaDetalleDTO.departamentos,
      situacion: HelpersService.isNoNuloYNoVacio(mercaderiaDetalleDTO.situacion)
        ? mercaderiaDetalleDTO.situacion
        : Situacion.ACTIVO, //Se pone por default Activo
      presentaEnReporte: mercaderiaDetalleDTO.presentaEnReporte,
      categoria: mercaderiaDetalleDTO.categoria,
      imagen: this.formatarBase64(mercaderiaDetalleDTO.imagen),
      valor: mercaderiaDetalleDTO.valor,
      tipoIva: mercaderiaDetalleDTO.tipoIva
    });

    this.imagenVistaPrevia = this.formGroupMercaderia.get('imagen')?.value;
  }

  private formatarBase64(base64: string | null) {
    return base64 && !base64.includes('data:image') ? `data:image/jpeg;base64,${base64}` : base64;
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
        .subscribe({
          next: resultado => this.onExito(),
          error: err => this.onError(err.error.mensajes)
        });
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

  private onError(error: string) {
    this._avisoHelpersService.mostrarMensaje('Error al guardar mercaderia: ' + error, '', 8000); //Mensaje cuando da error
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

  private listarCategoriasMercaderia() {
    this._mercaderiaService.listarTodosCategoriasMercaderia().subscribe((respuesta: any) => {
      this.listaCategoriasMercaderia = respuesta;
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
      departamentos: new FormControl('', [
        Validators.required
      ]),
      situacion: new FormControl('', [
        Validators.required
      ]),
      presentaEnReporte: new FormControl(true),
      categoria: new FormControl('', [
        Validators.required
      ]),
      imagen: new FormControl(''),
      valor: new FormControl(0, [Validators.required]),
      tipoIva: new FormControl('', [Validators.required])
    });
  }

  onSeleccionarImagen(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenVistaPrevia = reader.result as string;
        this.formGroupMercaderia.patchValue({ imagen: this.imagenVistaPrevia }); // guardar archivo en base64
        this.formGroupMercaderia.get('imagen')?.updateValueAndValidity();
      };

      reader.readAsDataURL(file);
    }
  }

  onEliminarImagen() {
    this.imagenVistaPrevia = null;
    this.formGroupMercaderia.patchValue({ imagen: null });
    this.formGroupMercaderia.get('imagen')?.updateValueAndValidity();
  }

}
