import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdicionalItemDTO } from '../../model/dtos/adicional-item-DTO';
import { AdicionalesService } from '../../services/adicionales.service';
import { OrdenItemDTO } from '../../model/dtos/orden-item-DTO';
import { AdicionalDTO } from '../../model/dtos/adicional-DTO';
import { isSeleccionMultiple, TipoAdicional } from '../../enums/tipo-adicional.enum';
interface AdicionalesGrupo {
  tipoAdicional: TipoAdicional;
  descripcionGrupo: string;
  adicionales: AdicionalDTO[];
}

@Component({
  selector: 'app-dialog-adicionales',
  templateUrl: './dialog-adicionales.component.html'
})
export class DialogAdicionalesComponent implements OnInit {

  data: { ordenItemDTO: OrdenItemDTO };
  adicionalesPorTipo: AdicionalesGrupo[] = [];
  seleccion: { [tipo in TipoAdicional]?: AdicionalItemDTO[] } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: { ordenItemDTO: OrdenItemDTO },
    private adicionalesService: AdicionalesService,
    private dialogRef: MatDialogRef<DialogAdicionalesComponent>
  ) {
    this.data = injectedData;
  }

  ngOnInit(): void {
    const ordenItem = this.data.ordenItemDTO;
    const categoriaId = ordenItem.mercaderia.categoria?._id;
    if (!categoriaId) return;

    this.adicionalesService.listarAdicionalesPorCategoria(categoriaId)
      .subscribe(resp => {
        const agrupados: { [key in TipoAdicional]?: AdicionalesGrupo } = {};

        resp.data.forEach(adicional => {
          // Asumo que adicional.tipoAdicional viene como string que coincide con TipoAdicional key
          const tipo = adicional.tipoAdicional as TipoAdicional;

          if (!agrupados[tipo]) {
            agrupados[tipo] = {
              tipoAdicional: tipo,
              descripcionGrupo: adicional.descripcion,
              adicionales: []
            };
          }
          agrupados[tipo]!.adicionales.push(adicional);
        });

        this.adicionalesPorTipo = Object.values(agrupados) as AdicionalesGrupo[];
      });
  }

  toggleSeleccion(adic: AdicionalDTO, tipo: TipoAdicional): void {
    let adicItem: AdicionalItemDTO = {
      _id: null,
      ordenItem: this.data.ordenItemDTO,
      adicional: adic,
      valor: adic.valor
    };

    if (!this.seleccion[tipo]) {
      this.seleccion[tipo] = [];
    }

    const isSelMultiple = isSeleccionMultiple(tipo);

    if (isSelMultiple) {
      const idx = this.seleccion[tipo]!.findIndex(i => i._id === adicItem._id);

      if (idx >= 0) {
        this.seleccion[tipo]!.splice(idx, 1);
      }
      else {
        this.seleccion[tipo]!.push(adicItem);
      }
    }
    else {
      this.seleccion[tipo] = [adicItem];
    }
  }

  confirmar(): void {
    const adicionales: AdicionalItemDTO[] = Object.values(this.seleccion).flat();
    this.dialogRef.close(adicionales);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  isItemSeleccionado(tipo: TipoAdicional, id: number): boolean {
    return this.seleccion[tipo]?.some(i => i._id === id) ?? false;
  }

  isSeleccionMultiple(tipoAdic: TipoAdicional): boolean {
    return isSeleccionMultiple(tipoAdic);
  }
}
