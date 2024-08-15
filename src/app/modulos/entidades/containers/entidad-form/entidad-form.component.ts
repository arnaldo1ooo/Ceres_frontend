import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { Sucursal } from 'src/app/modulos/sucursales/model/sucursal.model';

import { AvisoHelpersService } from '../../../../compartido/services/aviso-helpers.service';
import { ErrorHelpersService } from '../../../../compartido/services/error-helpers.service';
import { SucursalesService } from '../../../sucursales/services/sucursales.service';
import { EntidadesService } from '../../services/entidades.service';
import { Municipio } from '../../models/municipio.model';
import { MunicipiosService } from '../../services/municipios.service';
import { DepartamentoPolitico } from '../../models/departamentoPolitico.model';
import { LoginService } from 'src/app/modulos/login/services/login.service';
import { EntidadDetalleDTO } from '../../models/dtos/entidadDetalleDTO';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DepartamentosPoliticoService } from '../../services/departamentosPolitico.service';

@Component({
  selector: 'app-entidad-form',
  templateUrl: './entidad-form.component.html',
  styleUrls: ['./entidad-form.component.scss']
})
export class EntidadFormComponent implements OnInit {
  public listaSucursales: Sucursal[] = [];
  public listaMunicipios!: Municipio[];
  public listaSituaciones = Object.values(Situacion);
  public formEntidadDetalle = this._entidadService.formEntidadInicial();

  constructor(
    private _entidadService: EntidadesService,
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _sucursalService: SucursalesService,
    private _departamentosPoliticoService: DepartamentosPoliticoService,
    private _municipiosService: MunicipiosService,
    private _avisoHelpersService: AvisoHelpersService,
    private _loginService: LoginService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.cargarSelectSucursal();
    this.cargarSelectMunicipio();
    this.verificarModo();
    this.setFormValoresEntidad(this._ruta.snapshot.data['entidad'], this.formEntidadDetalle);
  }

  public onGuardar() {
    if (this.formEntidadDetalle.valid) { //Verifica los validators de cada campo del form
      /*this._departamentoService.guardar(this.formEntidad.getRawValue())
        .subscribe(resultado => this.onExito(), error => this.onError());*/
    }
    else {
      this.formEntidadDetalle.markAllAsTouched(); //Marca todos los campos invalidos
      this._avisoHelpersService.mostrarMensajeDatosInvalidosForm();
    }
  }

  public onRetroceder() {
    this._location.back(); //Para que retroceda de pagina
  }

  private onExito() {
    this._avisoHelpersService.mostrarMensaje('Entidad guardado con exito!', '', 4000)
    this.onRetroceder(); //Para que vuelva atras
  }

  private onError() {
    this._avisoHelpersService.mostrarMensaje('Error al guardar entidad', '', 4000);
  }

  private cargarSelectSucursal() {
    this._sucursalService.listarTodosSucursales().subscribe((lista: Sucursal[]) => {
      this.listaSucursales = lista;

    })
  }

  public cargarSelectMunicipio() {
    this._municipiosService.listarTodosMunicipios().subscribe((lista: Municipio[]) => {
      this.listaMunicipios = lista;

      if (lista.length > 0) {
        this.formEntidadDetalle.get('municipio')?.setValue(lista[0]); //Autoseleccionar primer registro
      }
    });
  }

  protected compararOpcionesSelect(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionRecibida);
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.formEntidadDetalle.get(nombreCampo);
    return ErrorHelpersService.verificarMensajeError(campo);
  }

  public verificarModo() {
    if (this.isPathModoVisualizar()) {
      this.formEntidadDetalle.disable();
    }
  }

  public isPathModoVisualizar(): boolean {
    return HelpersService.isPathModoVisualizar(this._ruta.snapshot.routeConfig?.path);
  }

  public setFormValoresEntidad(entidadDetalleDTO: EntidadDetalleDTO,  formEntidadDetalle: FormGroup): void {
    if(HelpersService.isNoNuloYNoVacioYNoUndefined(entidadDetalleDTO)) {
      formEntidadDetalle.patchValue({
        _id: entidadDetalleDTO._id,
        nombre: entidadDetalleDTO.nombre,
        apellido: entidadDetalleDTO.apellido,
        sucursal: entidadDetalleDTO.sucursal,
        municipio: entidadDetalleDTO.municipio,
        direccion: entidadDetalleDTO.direccion,
        tipo: entidadDetalleDTO.tipo,
        ci: entidadDetalleDTO.ci,
        ruc: entidadDetalleDTO.ruc,
        email: entidadDetalleDTO.email,
        observacion: entidadDetalleDTO.observacion,
        situacion: entidadDetalleDTO.situacion,
        clases: entidadDetalleDTO.clases
      });
    }
    else {  //Valores por default
      formEntidadDetalle.patchValue({
        sucursal: this._loginService.getSucursalLogado(),
        situacion: Situacion.ACTIVO
      });
    }

  }

  public displayDepartamentoPolitico(dptoPolitico: DepartamentoPolitico): string {
    if (dptoPolitico && dptoPolitico._id && dptoPolitico.descripcion) {
      return dptoPolitico.descripcion;
    }

    return '';
  }

  public displayMunicipio(municipio: Municipio): string {
    if (municipio && municipio._id && municipio.descripcion) {
      return municipio.descripcion;
    }

    return '';
  }

}
