import { EntidadDetalleDTO } from './../../../entidades/models/dtos/entidadDetalleDTO';
import { Component, OnInit } from '@angular/core';
import { ID_OPCION_TODOS } from 'src/app/compartido/constantes/constantes';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { CategoriaMercaderiaDTO } from 'src/app/modulos/mercaderias/model/dtos/categoria-mercaderiaDTO';
import { MercaderiaDTO } from 'src/app/modulos/mercaderias/model/dtos/mercaderiaDTO';
import { MercaderiaListaDTO } from 'src/app/modulos/mercaderias/model/dtos/mercaderiaListaDTO';
import { MercaderiasService } from 'src/app/modulos/mercaderias/services/mercaderias.service';
import { OrdenItemDTO } from '../../model/dtos/orden-item-DTO';
import { MatDialog } from '@angular/material/dialog';
import { DialogAdicionalesComponent } from '../../components/dialog-adicionales/dialog-adicionales.component';
import { AdicionalItemDTO } from '../../model/dtos/adicional-item-DTO';
import { AdicionalDTO } from '../../model/dtos/adicional-DTO';
import { FormArray, FormGroup } from '@angular/forms';
import { OrdenesService } from '../../services/ordenes.service';
import { ModoEdicion } from 'src/app/compartido/enums/modo-edicion.enum';
import { ActivatedRoute } from '@angular/router';
import { OrdenDetalleDTO } from '../../model/dtos/orden-detalle-DTO';
import { TipoEntregaOrden } from '../../enums/tipoEntregaOrden.enum';
import { UsuarioDTO } from 'src/app/modulos/usuarios/model/dtos/usuarioDTO';
import { EstadoOrden } from '../../enums/estado-orden.enum';
import { SiNo } from 'src/app/compartido/enums/si-no.enum';
import { FechaHelpersService } from 'src/app/compartido/services/fecha-helpers.service';
import { Moneda, MonedaEnum } from 'src/app/modulos/monedas/models/moneda';
import { LoginService } from 'src/app/modulos/login/services/login.service';
import { MonedasService } from 'src/app/modulos/monedas/services/monedas.service';
import { Departamento } from 'src/app/modulos/departamentos/model/departamento.model';
import { MercaderiaDetalleDTO } from 'src/app/modulos/mercaderias/model/dtos/mercaderiaDetalleDTO';

@Component({
  selector: 'app-ordenes-form',
  standalone: false,
  templateUrl: './ordenes-form.component.html',
  styleUrl: './ordenes-form.component.scss'
})
export class OrdenesFormComponent implements OnInit {

  protected listaMercaderias: MercaderiaDetalleDTO[] = [];
  protected listaMercaderiasFiltradas: MercaderiaDetalleDTO[] = [];
  protected filtroBuscarProducto: string = '';
  protected filtroIdCategoria!: number;
  protected listaCategoriasMercaderia: CategoriaMercaderiaDTO[] = [];

  protected formOrdenDetalle: FormGroup = this._ordenService.crearOrdenDetalleFormGroup();
  protected ItemsSeleccionados: OrdenItemDTO[] = [];
  protected modoEdicion: string = this._ruta.snapshot.data['modoEdicion']; //Proviene del routing


  constructor(
    private _mercaderiasService: MercaderiasService,
    private _ordenService: OrdenesService,
    private _loginService: LoginService,
    private _monedasService: MonedasService,
    private _dialog: MatDialog,
    private _ruta: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.verificarModoEdicion();
    this.cargarDatosOrden();

    this.listarMercaderias();
    this.listarCategorias();

    this.filtroIdCategoria = ID_OPCION_TODOS;
  }

  private async cargarDatosOrden() {
    try {
      let ordenDetalleDTO: OrdenDetalleDTO = this._ruta.snapshot.data['orden'];  //Obtiene el objeto del resolver

      //Si es nuevo
      if (HelpersService.isNuloOrVacio(ordenDetalleDTO._id)) {
        this.cargarDatosEnForm(
          '0',
          null,
          '',
          '',
          FechaHelpersService.getFechaHoraActual(),
          this._loginService.getDepartamentoLogado(),
          await this._monedasService.cargarPorId(MonedaEnum.GUARANI),
          null,
          0,
          TipoEntregaOrden.EN_MOSTRADOR,
          SiNo.NO,
          '',
          EstadoOrden.PENDIENTE,
          '',
          '',
          []
        );
      }
      /*else { //Is Editar
        this.cargarDatosEnForm(
          movimientoDetalleDTO._id,
          movimientoDetalleDTO.tipo,
          movimientoDetalleDTO.moneda,
          movimientoDetalleDTO.entidad,
          movimientoDetalleDTO.fechaEmision,
          movimientoDetalleDTO.departamento,
          movimientoDetalleDTO.compradorVendedor,
          movimientoDetalleDTO.observacion,
          movimientoDetalleDTO.situacion,
          movimientoDetalleDTO.items,
          movimientoDetalleDTO.formaPago,
          movimientoDetalleDTO.movimientoCuentasContables
        )
      }*/
    }
    catch (error) {
      throw error;
    }
  }

  listarMercaderias() {
    this._mercaderiasService.listarTodosMercaderiasActivosDetallado().subscribe({
      next: (retorno: MercaderiaDetalleDTO[]) => {
        this.listaMercaderias = retorno;
        this.listaMercaderiasFiltradas = this.listaMercaderias;
      },
      error: (err) => console.log("Error al listar mercaderias: " + err)
    });
  }

  filtrarMercaderias() {
    const textoABuscar: string = this.filtroBuscarProducto.toLowerCase().trim();
    const idCategoria: number = this.filtroIdCategoria;

    this.listaMercaderiasFiltradas = this.listaMercaderias.filter((m) => {
      const isContieneTexto: boolean = m.descripcion.toLowerCase().includes(textoABuscar);
      const isCoincideCategoria: boolean = idCategoria == ID_OPCION_TODOS || m.categoria?._id == idCategoria;

      return isContieneTexto && isCoincideCategoria;
    });
  }

  addItemMerc(mercSel: MercaderiaDetalleDTO) {

    let mercaderiaDTO : MercaderiaDTO = { ...mercSel }; //Convertimos de MercaderiaListaDTO a mercaderiaDTO

    let ordenItemDTO: OrdenItemDTO = {
      mercaderia: mercaderiaDTO,
      cantidad: 1,
      valorUnitario: 0,
      descuento: 0,
      numeroItem: 0,
      observacion: '',
      adicionales: []
    };



    this._dialog.open(DialogAdicionalesComponent, {
      data: { ordenItemDTO }, // Enviamos al diálogo nuestro item
      maxWidth: '95vw',
      width: '80%',
      height: 'auto',
    })
      .afterClosed()
      .subscribe((adicionalesItemSel: AdicionalItemDTO[] | undefined) => {
        if (adicionalesItemSel) {
          let adicionalesSel: AdicionalDTO[] = adicionalesItemSel.map(item => item.adicional);
          ordenItemDTO.adicionales = adicionalesSel;
          this.ItemsSeleccionados.push(ordenItemDTO);
        }
      });
  }

  getSubtotal() {
    return this.ItemsSeleccionados.reduce((total, item) => total + (item.valorUnitario * item.cantidad), 0);
  }

  getTax() {
    return this.getSubtotal() * 0.15;
  }

  getTotal() {
    return this.getSubtotal() + this.getTax();
  }

  checkout() {
    alert('Checkout complete!');
    // Implement checkout logic
  }

  protected compararOpcionesSelect(opcion: any, opcionRecibida: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionRecibida);
  }

  private listarCategorias() {
    this._mercaderiasService.listarTodosCategoriasMercaderia().subscribe((resp: any) => {
      this.listaCategoriasMercaderia = resp;
    })
  }

  cambiarCantidadItemSel(item: OrdenItemDTO, cambio: number): void {
    const nuevaCantidad = item.cantidad + cambio;
    item.cantidad = nuevaCantidad < 1 ? 1 : nuevaCantidad;
  }

  removerItemSel(itemSel: OrdenItemDTO) {
    this.ItemsSeleccionados = this.ItemsSeleccionados
      .filter(item => item.mercaderia.descripcion !== itemSel.mercaderia.descripcion);
  }

  private verificarModoEdicion() {
    switch (this.modoEdicion) {
      case ModoEdicion.MODO_NUEVO:
        this.formOrdenDetalle.get('situacion')?.disable();
        break;

      case ModoEdicion.MODO_EDITAR:
        this.formOrdenDetalle.get('situacion')?.disable();
        this.formOrdenDetalle.get('fechaEmision')?.disable();
        break;

      case ModoEdicion.MODO_VISUALIZAR:
        this.formOrdenDetalle.disable();
        break;
    }
  }

  private cargarDatosEnForm(
    id: string,
    entidad: EntidadDetalleDTO | null,
    nombreApellidoOcasional: string,
    celularOcasional: string,
    fechaEmision: Date | null,
    departamento: Departamento | null,
    moneda: Moneda,
    usuario: UsuarioDTO | null,
    descuentoGlobal: number,
    tipoEntrega: TipoEntregaOrden,
    notificado: SiNo,
    motivoCancelacion: string,
    estado: EstadoOrden,
    numeroMesa: string,
    observacion: string,
    items: OrdenItemDTO[]
  ) {
    this.formOrdenDetalle.patchValue({
      _id: id,
      entidad: entidad,
      nombreApellidoOcasional: nombreApellidoOcasional,
      celularOcasional: celularOcasional,
      fechaEmision: fechaEmision,
      departamento: departamento,
      moneda: moneda,
      usuario: usuario,
      descuentoGlobal: descuentoGlobal,
      tipoEntrega: tipoEntrega,
      notificado: notificado,
      motivoCancelacion: motivoCancelacion,
      estado: estado,
      numeroMesa: numeroMesa,
      observacion: observacion
    });

    // Limpia el array de items y vuelve a cargar
    const itemsFormArray = this.formOrdenDetalle.get('items') as FormArray;
    itemsFormArray.clear();
    for (let item of items) {
      this.addItem(item); // asumimos que este método ya agrega el FormGroup al array
    }
  }

  private addItem(item: OrdenItemDTO) {
    (this.formOrdenDetalle.get('items') as FormArray)
      .push(this._ordenService.crearOrdenItemFormGroup(item));
  }

}
