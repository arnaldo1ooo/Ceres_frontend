import { AvisoHelpersService } from './../../../../compartido/services/aviso-helpers.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Situacion, SituacionUtils } from 'src/app/compartido/enums/situacion.enum';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { SucursalesService } from 'src/app/modulos/sucursales/services/sucursales.service';

import { TipoMercaderia, TipoMercaderiaUtils } from '../../enums/tipoMercaderia.enum';
import { Mercaderia } from '../../model/mercaderia';
import { MercaderiasService } from '../../services/mercaderias.service';

@Component({
  selector: 'app-mercaderia-form',
  templateUrl: './mercaderia-form.component.html',
  styleUrls: ['./mercaderia-form.component.scss']
})
export class MercaderiaFormComponent implements OnInit {
  public listaTiposMercaderia = Object.values(TipoMercaderia);
  public listaSucursales: any;
  public listaSituaciones = Object.values(Situacion);
  public tipoMercaderiaUtils = TipoMercaderiaUtils;
  public situacionUtils = SituacionUtils;

  public formMercaderia = this._formBuilder.group({
    _id: [''],  //Sirve para el modo editar
    descripcion: ['', [
      Validators.required, //Los validators sirven para agregar validaciones al campo
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    tipo: ['', [
      Validators.required
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
    private _mercaderiaService: MercaderiasService,
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _sucursalService: SucursalesService,
    private _avisoHelpersService: AvisoHelpersService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.listaSucursales = this.listarSucursales();
    this.verificarModo();

    const mercaderia: Mercaderia = this._ruta.snapshot.data['mercaderia'];  //Obtiene el objeto del resolver

    this.formMercaderia.setValue({ //Setamos los datos para que aparezca al editar
      _id: mercaderia._id,
      descripcion: mercaderia.descripcion,
      tipo: HelpersService.isNoNuloYNoVacio(mercaderia.tipo)
                  ? TipoMercaderiaUtils.getTipoMercaderiaPorDescripcion(mercaderia.tipo)
                  : '',
      sucursal: mercaderia.sucursal,
      situacion: HelpersService.isNoNuloYNoVacio(mercaderia.situacion)
                  ? SituacionUtils.getSituacionPorDescripcion(mercaderia.situacion)
                  : Situacion.ACTIVO //Se pone por default Activo
    });
  }

  onGuardar() {
    this._mercaderiaService.guardar(this.formMercaderia.value)
      .subscribe(resultado => this.onExito(), error => this.onError());
  }

  onCancelar() {
    this._location.back(); //Para que retroceda de pagina
  }

  private onExito() {
    this._avisoHelpersService.mostrarMensaje('Mercaderia guardado con exito!', '', 4000);  //Mensaje cuando salva correctamente
    this.onCancelar(); //Para que vuelva atras
  }

  private onError() {
    this._avisoHelpersService.mostrarMensaje('Error al guardar mercaderia', '', 4000); //Mensaje cuando da error
  }

  protected compararById(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararById(opcion, opcionRecibida);
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.formMercaderia.get(nombreCampo); //Obtenemos el elemento

    if (campo?.hasError('required')) { //En ?.hasError ya valida si es nulo
      return 'Campo obligatorio';
    }

    if (campo?.hasError('minlength')) {
      const minCaracteres = campo.errors ? campo.errors['minlength']['requiredLength'] : 3; //Se obtiene el minimo requerido
      return `Tamaño mínimo es de ${minCaracteres} carácteres`;
    }

    if (campo?.hasError('maxlength')) {
      const maxCaracteres = campo.errors ? campo.errors['maxlength']['requiredLength'] : 100; //Se obtiene el minimo requerido
      return `Tamaño máximo es de ${maxCaracteres} carácteres`;
    }

    return 'Campo inválido';
  }

  public verificarModo() {
    if (this.isModoVisualizar()) {
      this.formMercaderia.disable();
    }
  }

  public isModoVisualizar(): boolean {
    return HelpersService.isModoVisualizar(this._ruta.snapshot.routeConfig?.path);
  }

  private listarSucursales() { //Cargamos la lista de sucursales para mostrar en el dropdown
    this._sucursalService.listarTodosSucursales().subscribe((respuesta: any) => {
      this.listaSucursales = respuesta;
    })
  }
}
