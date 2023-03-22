import { AvisoHelpersService } from './../../../../compartido/services/aviso-helpers.service';
import { ErrorHelpersService } from './../../../../compartido/services/error-helpers.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { HelpersService } from 'src/app/compartido/services/helpers.service';

import { Filial } from '../../model/filial';
import { FilialesService } from '../../services/filiales.service';
import { SucursalesService } from './../../../sucursales/services/sucursales.service';

@Component({
  selector: 'app-filial-form',
  templateUrl: './filial-form.component.html',
  styleUrls: ['./filial-form.component.scss']
})
export class FilialFormComponent implements OnInit {
  listaSucursales: any;
  listaSituaciones = Object.values(Situacion);

  formFilial = this._formBuilder.group({
    _id: [''],  //Sirve para el modo editar
    nombre: ['', [
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
    private _filialService: FilialesService,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _sucursalService: SucursalesService,
    private _avisoHelpersService: AvisoHelpersService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.cargarDropDownSucursal();
    this.verificarModo();

    const filial: Filial = this._ruta.snapshot.data['filial'];  //Obtiene el objeto filial del resolver

    this.formFilial.setValue({ //Setamos los datos del filial para que aparezca al editar
      _id: filial._id,
      nombre: filial.nombre,
      sucursal: filial.sucursal,
      situacion: HelpersService.isNoNuloYNoVacio(filial.situacion) ? filial.situacion : Situacion.ACTIVO //Se pone por default Activo
    });
  }

  public onGuardar() {
    if(this.formFilial.valid) { //Verifica los validators de cada campo del form
      this._filialService.guardar(this.formFilial.value)
      .subscribe(resultado => this.onExito(), error => this.onError());
    }
    else {
      this.formFilial.markAllAsTouched(); //Marca todos los campos invalidos
      this._avisoHelpersService.mostrarMensajeDatosInvalidosForm();
    }
  }

  public onCancelar() {
    this._location.back(); //Para que retroceda de pagina
  }

  private onExito() {
    this._avisoHelpersService.mostrarMensaje('Filial guardado con exito!', '', 4000)
    this.onCancelar(); //Para que vuelva atras
  }

  private onError() {
    this._avisoHelpersService.mostrarMensaje('Error al guardar filial', '', 4000);
  }

  private cargarDropDownSucursal() {
    this._sucursalService.listarTodosSucursales().subscribe((lista: any) => {  //Cargamos la lista de sucursales para mostrar en el dropdown
      this.listaSucursales = lista;
    })
  }

  protected compararById(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararById(opcion, opcionRecibida);
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.formFilial.get(nombreCampo); //Obtenemos el elemento
    ErrorHelpersService.verificarMensajeError(campo);
  }

  public verificarModo() {
    if(this.isModoVisualizar()) {
      this.formFilial.disable();
    }
  }

  public isModoVisualizar(): boolean {
    return HelpersService.isModoVisualizar(this._ruta.snapshot.routeConfig?.path);
  }




}
