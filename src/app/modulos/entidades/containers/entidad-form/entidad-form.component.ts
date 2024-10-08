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
import { Observable } from 'rxjs/internal/Observable';
import { map, of, startWith } from 'rxjs';
import { TipoEntidad } from '../../enums/tipo-entidad.enum';
import { ClaseEntidad } from '../../models/claseEntidad.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EntidadDetalleForm } from '../../models/dtos/entidadDetalleForm';
import { ModoEdicion } from 'src/app/compartido/enums/modoEdicion.enum';

@Component({
  selector: 'app-entidad-form',
  templateUrl: './entidad-form.component.html',
  styleUrls: ['./entidad-form.component.scss']
})
export class EntidadFormComponent implements OnInit {
  public modoEdicion: string = this._ruta.snapshot.data['modoEdicion']; //Proviene del routing

  protected listaSucursales: Sucursal[] = [];

  protected listaMunicipios: Municipio[] = [];
  protected listaMunicipiosFiltrado$: Observable<Municipio[]> = of([]);

  protected listaSituaciones = Object.values(Situacion);
  protected listaClasesEntidad: ClaseEntidad[] = [];
  protected listaTiposEntidad = Object.values(TipoEntidad);
  protected entidadDetalleForm = this._entidadService.crearEntidadFormGroup();

  constructor(
    private _entidadService: EntidadesService,
    private _location: Location,
    private _ruta: ActivatedRoute,
    private _sucursalService: SucursalesService,
    private _municipiosService: MunicipiosService,
    private _avisoHelpersService: AvisoHelpersService,
    private _loginService: LoginService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.listarSucursal();
    this.listarClasesEntidad();
    this.listarFiltrarMunicipios();

    this.verificarModoEdicion();
    this.setFormValoresEntidad(this._ruta.snapshot.data['entidad'], this.entidadDetalleForm);
  }

  public onGuardar() {
    if (this.entidadDetalleForm.valid) {
      this._entidadService.guardar(this.entidadDetalleForm.getRawValue())
        .subscribe({
          next: (resultado) => {
            this.onExito();
          },
          error: (err: HttpErrorResponse) => {
            this.onError(err);
          }
        });
    }
    else {
      this.entidadDetalleForm.markAllAsTouched(); //Marca todos los campos invalidos
      this._avisoHelpersService.mostrarMensajeDatosInvalidosForm();
    }
  }

  public onRetroceder() {
    this._location.back(); //Para que retroceda de pagina
  }

  private onExito() {
    this._avisoHelpersService.mostrarMensaje('Entidad guardado con exito!', '')
    this.onRetroceder();
  }

  private onError(err: HttpErrorResponse) {
    this._avisoHelpersService.mostrarMensajeError('Error al guardar entidad: ', err);
  }

  private listarSucursal() {
    this._sucursalService.listarTodosSucursales().subscribe((lista: Sucursal[]) => {
      this.listaSucursales = lista;
    })
  }

  private listarClasesEntidad() {
    this._entidadService.listarClasesEntidades().subscribe((lista: ClaseEntidad[]) => {
      this.listaClasesEntidad = lista;
    })
  }

  protected compararOpcionesSelect(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionRecibida);
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.entidadDetalleForm.get(nombreCampo);
    return ErrorHelpersService.verificarMensajeError(campo);
  }

  private verificarModoEdicion() {
    switch (this.modoEdicion) {
      case ModoEdicion.MODO_NUEVO:
        this.entidadDetalleForm.get('situacion')?.disable();
        break;

      case ModoEdicion.MODO_EDITAR:
        this.entidadDetalleForm.get('situacion')?.disable();
        break;

      case ModoEdicion.MODO_VISUALIZAR:
        this.entidadDetalleForm.disable();
        break;
    }
  }

  public setFormValoresEntidad(entidadDetalleDTO: EntidadDetalleDTO, formEntidadDetalle: FormGroup<EntidadDetalleForm>): void {
    if (entidadDetalleDTO._id) { // Si tiene ID
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
        fechaCreacion: entidadDetalleDTO.fechaCreacion,
        observacion: entidadDetalleDTO.observacion,
        situacion: entidadDetalleDTO.situacion,
        clases: entidadDetalleDTO.clases,
        celular: entidadDetalleDTO.celular
      });
    }
    else {  //Valores por default
      formEntidadDetalle.patchValue({
        sucursal: this._loginService.getSucursalLogado(),
        municipio: this.listaMunicipios[140], //Minga Guazu
        tipo: TipoEntidad.FISICA,
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

  private listarFiltrarMunicipios(): void {
    this._municipiosService.listarTodosMunicipios().subscribe((lista: Municipio[]) => {
      this.listaMunicipios = lista;

      // Se ejecuta cuando se escribe en autocomplete
      this.listaMunicipiosFiltrado$ = this.entidadDetalleForm.get('municipio')!.valueChanges.pipe(
        startWith(''), // Se inicia con valor vacío para listar todos los registros
        map(valorAFiltrar =>
          this.listaMunicipios?.filter(municipio =>
            municipio.descripcion?.toLocaleLowerCase().includes(valorAFiltrar || ''))
        )
      );
    });
  }

}
