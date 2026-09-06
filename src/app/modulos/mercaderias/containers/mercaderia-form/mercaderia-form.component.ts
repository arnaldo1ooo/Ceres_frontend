import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
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
      mercaderiaImagenes: mercaderiaDetalleDTO.mercaderiaImagenes,
      valor: mercaderiaDetalleDTO.valor,
      tipoIva: mercaderiaDetalleDTO.tipoIva
    });

    const imagen1 = mercaderiaDetalleDTO.mercaderiaImagenes?.[0]?.imagen ?? null;
    this.imagenVistaPrevia = imagen1;
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
      mercaderiaImagenes: new FormControl('', []),
      valor: new FormControl(0, [Validators.required]),
      tipoIva: new FormControl('', [Validators.required])
    });
  }

  onSeleccionarImagen(event: any): void {
    // Obtener el elemento input que contiene el archivo seleccionado
    const input = event.target as HTMLInputElement;

    // Obtener el primer archivo seleccionado
    const file = input.files?.[0];

    if (file) {
      // Crear lector para convertir el archivo a Base64
      const reader = new FileReader();

      reader.onload = () => {
        // Guardar la imagen en Base64 para mostrar la vista previa
        this.imagenVistaPrevia = reader.result as string;

        // Obtener las imágenes actuales para conservar el ID
        const imagenes = this.formGroupMercaderia
          .get('mercaderiaImagenes')
          ?.value;

        // Mantener el ID de la imagen existente y reemplazar únicamente
        // su contenido. Si no existe una imagen, se crea una nueva con ID null.
        this.formGroupMercaderia.patchValue({
          mercaderiaImagenes: [
            {
              _id: imagenes?.[0]?._id ?? null,
              imagen: this.imagenVistaPrevia
            }
          ]
        });

        // Actualizar el estado de validación del control
        this.formGroupMercaderia
          .get('mercaderiaImagenes')
          ?.updateValueAndValidity();
      };

      // Leer el archivo como Data URL (Base64)
      reader.readAsDataURL(file);
    }
  }

  onEliminarImagen(): void {
    // Limpiar la imagen de la vista previa.
    this.imagenVistaPrevia = null;

    // Obtener las imágenes actualmente almacenadas en el formulario.
    const imagenes = this.formGroupMercaderia.get('mercaderiaImagenes')?.value;

    if (imagenes?.length) {
      // Mantener el ID de la relacion mercaderia imagen y establecer su contenido en null
      // para indicar al backend que el registro debe ser eliminado.
      this.formGroupMercaderia.patchValue({
        mercaderiaImagenes: imagenes.map((imagen: any) => ({
          ...imagen,
          imagen: null
        }))
      });
    }

    // Actualizar el estado de validación del control.
    this.formGroupMercaderia.get('mercaderiaImagenes')?.updateValueAndValidity();
  }

}
