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

  formFilial = this.formBuilder.group({
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
    private formBuilder: NonNullableFormBuilder,
    private filialService: FilialesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private ruta: ActivatedRoute,
    private sucursalService: SucursalesService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.cargarDropDownSucursal();
    this.verificarModo();

    const filial: Filial = this.ruta.snapshot.data['filial'];  //Obtiene el objeto filial del resolver

    this.formFilial.setValue({ //Setamos los datos del filial para que aparezca al editar
      _id: filial._id,
      nombre: filial.nombre,
      sucursal: filial.sucursal,
      situacion: HelpersService.isNoNuloYNoVacio(filial.situacion) ? filial.situacion : Situacion.ACTIVO //Se pone por default Activo
    });
  }

  onGuardar() {
    this.filialService.guardar(this.formFilial.value)
      .subscribe(resultado => this.onExito(), error => this.onError());
  }

  onCancelar() {
    this.location.back(); //Para que retroceda de pagina
  }

  private onExito() {
    this.snackBar.open('Filial guardado con exito!', '', { duration: 4000 });  //Mensaje cuando salva correctamente
    this.onCancelar(); //Para que vuelva atras
  }

  private onError() {
    this.snackBar.open('Error al guardar filial', '', { duration: 4000 });  //Mensaje cuando da error
  }

  private cargarDropDownSucursal() {
    this.sucursalService.listarTodosSucursales().subscribe((lista: any) => {  //Cargamos la lista de sucursales para mostrar en el dropdown
      this.listaSucursales = lista;
    })
  }

  protected compararById(opcion: any, opcionRecibida: any): boolean {//Esta comparacion se ejecuta con cada opcion de la lista compara Lista = sucursal.id
    return opcion && opcionRecibida
      ? opcion.id === opcionRecibida.id
      : opcion === opcionRecibida;
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.formFilial.get(nombreCampo); //Obtenemos el elemento

    if (campo ?.hasError('required')) { //En ?.hasError ya valida si es nulo
      return 'Campo obligatorio';
    }

    if (campo ?.hasError('minlength')) {
      const minCaracteres = campo.errors ? campo.errors['minlength']['requiredLength'] : 3; //Se obtiene el minimo requerido
      return `Tamaño mínimo es de ${minCaracteres} carácteres`;
    }

    if (campo ?.hasError('maxlength')) {
      const maxCaracteres = campo.errors ? campo.errors['maxlength']['requiredLength'] : 100; //Se obtiene el minimo requerido
      return `Tamaño máximo es de ${maxCaracteres} carácteres`;
    }

    return 'Campo inválido';
  }

  public verificarModo() {
    if(this.isModoVisualizar()) {
      this.formFilial.disable();
    }
  }

  public isModoVisualizar(): boolean {
    return HelpersService.isModoVisualizar(this.ruta.snapshot.routeConfig?.path);
  }




}
