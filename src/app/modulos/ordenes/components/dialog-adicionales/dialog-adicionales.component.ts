import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdicionalItemDTO } from '../../model/dtos/adicional-item-DTO';
import { AdicionalesService } from '../../services/adicionales.service';
import { OrdenItemDTO } from '../../model/dtos/orden-item-DTO';

@Component({
  selector: 'app-dialog-adicionales',
  templateUrl: './dialog-adicionales.component.html'
})
export class DialogAdicionalesComponent implements OnInit {

  @Inject(MAT_DIALOG_DATA) public data!: { ordenItemDTO: OrdenItemDTO };
  adicionalesAgrupados: { tipo: string; descripcion: string; items: AdicionalItemDTO[] }[] = [];
  seleccion: { [tipo: string]: AdicionalItemDTO[] } = {};


  constructor(
    private adicionalesService: AdicionalesService,
    private dialogRef: MatDialogRef<DialogAdicionalesComponent>
  ) { }


  ngOnInit() {
    this.adicionalesService.listarAdicionalesPorCategoria(this.data.ordenItemDTO.mercaderia.categoria?._id!).subscribe((adicionales) => {
      adicionales.forEach(ad => {
        this.adicionalesService.listarValoresDeAdicionales(ad.valor).subscribe((items) => {
          this.adicionalesAgrupados.push({ tipo: ad.tipo, descripcion: ad.descripcion, items });
        });
      });
    });
  }

  toggleSeleccion(item: AdicionalItemDTO, tipo: string, multiple: boolean = false) {
    if (!this.seleccion[tipo]) this.seleccion[tipo] = [];

    if (multiple) {
      const idx = this.seleccion[tipo].findIndex(i => i.id === item.id);
      if (idx >= 0) this.seleccion[tipo].splice(idx, 1);
      else this.seleccion[tipo].push(item);
    } else {
      this.seleccion[tipo] = [item];
    }
  }

  confirmar() {
    const adicionales: AdicionalItemDTO[] = Object.values(this.seleccion).flat();
    this.dialogRef.close(adicionales);
  }

  cancelar() {
    this.dialogRef.close();
  }

  isItemSeleccionado(tipo: string, id: number): boolean {
    return this.seleccion[tipo]?.some(i => i.id === id) ?? false;
  }
}
