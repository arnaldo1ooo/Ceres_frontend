import { Component, OnInit } from '@angular/core';
import { map, Observable, of, startWith } from 'rxjs';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { MercaderiaDTO } from 'src/app/modulos/mercaderias/model/dtos/mercaderiaDTO';
import { MercaderiaListaDTO } from 'src/app/modulos/mercaderias/model/dtos/mercaderiaListaDTO';
import { MercaderiasService } from 'src/app/modulos/mercaderias/services/mercaderias.service';

@Component({
  selector: 'app-ordenes-form',
  standalone: false,
  templateUrl: './ordenes-form.component.html',
  styleUrl: './ordenes-form.component.scss'
})
export class OrdenesFormComponent implements OnInit {

  protected listaMercaderias: MercaderiaListaDTO[] = [];
  protected listaMercaderiasFiltradas: MercaderiaListaDTO[] = [];
  protected selectedItems: any[] = [];
  protected filtroBuscarProducto: string = '';

  constructor(
    private _mercaderiasService: MercaderiasService
  )
  {

  }

  ngOnInit(): void {
    this.cargarMercaderias();
  }

  cargarMercaderias() {
       this._mercaderiasService.listarTodosMercaderiasActivos().subscribe({
         next: (retorno: MercaderiaListaDTO[]) => {
           this.listaMercaderias = retorno;
           this.listaMercaderiasFiltradas = this.listaMercaderias;
         },
         error: (err) => console.log("Error al listar mercaderias: " + err)
       });
  }

  onSearch() {

    this.listaMercaderiasFiltradas = this.listaMercaderias.filter(merc =>
      merc.descripcion.toLowerCase().includes(''.toLowerCase())
    );
  }

  addItem(item: MercaderiaDTO) {
    const existingItem = this.selectedItems.find(selected => selected.nombre === item.descripcion);
    if (existingItem) {
      existingItem.cantidad++;
    } else {
      this.selectedItems.push({...item, cantidad: 1});
    }
  }

  removeItem(selectedItem: any) {
    this.selectedItems = this.selectedItems.filter(item => item.nombre !== selectedItem.nombre);
  }

  getSubtotal() {
    return this.selectedItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
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
}
