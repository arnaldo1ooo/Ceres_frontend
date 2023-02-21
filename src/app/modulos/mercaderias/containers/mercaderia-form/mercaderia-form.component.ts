import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Situacion } from 'src/app/compartido/enums/situacion.enum';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { SucursalesService } from 'src/app/modulos/sucursales/services/sucursales.service';

import { Mercaderia } from '../../model/mercaderia';
import { MercaderiasService } from '../../services/mercaderias.service';

@Component({
  selector: 'app-mercaderia-form',
  templateUrl: './mercaderia-form.component.html',
  styleUrls: ['./mercaderia-form.component.scss']
})
export class MercaderiaFormComponent implements OnInit {
  listaSucursales: any;

  formMercaderia = this.formBuilder.group({
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
    private formBuilder: NonNullableFormBuilder,
    private mercaderiaService: MercaderiasService,
    private snackBar: MatSnackBar,
    private location: Location,
    private ruta: ActivatedRoute,
    private helpersService: HelpersService,
    private sucursalService: SucursalesService) {

  }

  ngOnInit(): void {  //Se ejecuta al iniciar componente
    this.cargarDropDownSucursal();
    this.verificarModo();

    const mercaderia: Mercaderia = this.ruta.snapshot.data['mercaderia'];  //Obtiene el objeto filial del resolver

    this.formMercaderia.setValue({ //Setamos los datos del filial para que aparezca al editar
      _id: mercaderia._id,
      descripcion: mercaderia.descripcion,
      tipo: mercaderia.tipo,
      sucursal: mercaderia.sucursal,
      situacion: this.helpersService.isNoNuloOrVacio(mercaderia.situacion) ? mercaderia.situacion : Situacion.ACTIVO //Se pone por default Activo
    });
  }

  onGuardar() {
    this.mercaderiaService.guardar(this.formMercaderia.value)
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

  protected compararById(opcion: any, opcionRecibida: any): boolean {//Esta comparacion se ejecuta con cada opcion de la lista compara Lista = sucursal.id
    return opcion && opcionRecibida
      ? opcion.id === opcionRecibida.id
      : opcion === opcionRecibida;
  }

  public getMensajeError(nombreCampo: string) {
    const campo = this.formMercaderia.get(nombreCampo); //Obtenemos el elemento

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
      this.formMercaderia.disable();
    }
  }

  public isModoVisualizar(): boolean {
    return this.helpersService.isModoVisualizar(this.ruta.snapshot.routeConfig?.path);
  }

  private cargarDropDownSucursal() {
    this.sucursalService.listarTodosSucursales().subscribe((lista: any) => {  //Cargamos la lista de sucursales para mostrar en el dropdown
      this.listaSucursales = lista;
    })
  }


}
