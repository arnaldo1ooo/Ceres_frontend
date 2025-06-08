import { Component, OnInit } from '@angular/core';
import { ID_OPCION_TODOS } from 'src/app/compartido/constantes/constantes';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { CategoriaMercaderiaDTO } from 'src/app/modulos/mercaderias/model/dtos/categoria-mercaderiaDTO';
import { MercaderiaDTO } from 'src/app/modulos/mercaderias/model/dtos/mercaderiaDTO';
import { MercaderiaListaDTO } from 'src/app/modulos/mercaderias/model/dtos/mercaderiaListaDTO';
import { MercaderiasService } from 'src/app/modulos/mercaderias/services/mercaderias.service';
import { OrdenItemDTO } from '../../model/dtos/orden-item-DTO';
import { OrdenItem } from '../../model/orden-item';
import { MatDialog } from '@angular/material/dialog';
import { DialogAdicionalesComponent } from '../../components/dialog-adicionales/dialog-adicionales.component';
import { AdicionalItemDTO } from '../../model/dtos/adicional-item-DTO';
import { AdicionalDTO } from '../../model/dtos/adicional-DTO';

@Component({
  selector: 'app-ordenes-form',
  standalone: false,
  templateUrl: './ordenes-form.component.html',
  styleUrl: './ordenes-form.component.scss'
})
export class OrdenesFormComponent implements OnInit {

  protected listaMercaderias: MercaderiaListaDTO[] = [];
  protected listaMercaderiasFiltradas: MercaderiaListaDTO[] = [];
  protected ItemsSeleccionados: OrdenItemDTO[] = [];
  protected filtroBuscarProducto: string = '';
  protected filtroIdCategoria!: number;
  protected listaCategoriasMercaderia: CategoriaMercaderiaDTO[] = [];

  constructor(
    private _mercaderiasService: MercaderiasService,
    private _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.listarMercaderias();
    this.listarCategorias();

    this.filtroIdCategoria = ID_OPCION_TODOS;
  }

  listarMercaderias() {
    this._mercaderiasService.listarTodosMercaderiasActivos(true).subscribe({
      next: (retorno: MercaderiaListaDTO[]) => {
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

  addItem(mercSel: MercaderiaDTO) {

    let ordenItemDTO: OrdenItemDTO = {
      mercaderia: mercSel,
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
          // Convertimos el array de AdicionalItemDTO a AdicionalDTO extrayendo la propiedad 'adicional'
          let adicionalesSel: AdicionalDTO[] = adicionalesItemSel.map(item => item.adicional);

          // Asignamos al ordenItemDTO el array de adicionales seleccionados
          ordenItemDTO.adicionales = adicionalesSel;

          // Lo agregamos a la lista de items seleccionados
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

}
