import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdicionalItemDTO } from '../../model/dtos/adicional-item-DTO';
import { AdicionalesService } from '../../services/adicionales.service';
import { OrdenItemDTO } from '../../model/dtos/orden-item-DTO';
import { AdicionalDTO } from '../../model/dtos/adicional-DTO';
import { TipoAdicional, TipoAdicionalUtils } from '../../enums/tipo-adicional.enum';
import { MonedaHelpersService } from 'src/app/compartido/services/moneda-helpers.service';
import { Moneda } from 'src/app/modulos/monedas/models/moneda';
interface AdicionalesPorTipo {
  tipoAdicional: TipoAdicional;
  descripcionGrupo: string;
  adicionales: AdicionalDTO[];
}

@Component({
  selector: 'app-dialog-adicionales',
  templateUrl: './dialog-adicionales.component.html',
  styleUrls: ['./dialog-adicionales.component.scss']
})
export class DialogAdicionalesComponent implements OnInit {

  data: { ordenItemDTO: OrdenItemDTO, moneda: Moneda };
  adicionalesPorTipo: AdicionalesPorTipo[] = [];
  valorUnitarioTotal: number = 0;
  selectedAdics: { [tipo in TipoAdicional]?: AdicionalItemDTO[] } = {}; //Tipo -> adicSel
  selectedAdicsId: { [tipo in TipoAdicional]?: number } = {}; //Tipo -> ID adic

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: { ordenItemDTO: OrdenItemDTO, moneda: Moneda },
    private adicionalesService: AdicionalesService,
    private dialogRef: MatDialogRef<DialogAdicionalesComponent>
  ) {
    this.data = injectedData; //Recibimos el item
    this.valorUnitarioTotal = injectedData.ordenItemDTO.valorUnitario;
  }

  ngOnInit(): void {
    const ordenItem = this.data.ordenItemDTO;
    const categoriaId = ordenItem.mercaderia.categoria?._id;


    this.agruparAdicionalesPorTipo(this.data.ordenItemDTO.mercaderia.categoria!.adicionales);

    this.seleccionarAdicPorDefault();
  }

  private seleccionarAdicPorDefault() {
    this.adicionalesPorTipo.forEach(grupo => {
      if (!this.isSeleccionMultiple(grupo.tipoAdicional) && grupo.adicionales.length > 0) { //Solo para grupo tipo unico
        const primerAdic = grupo.adicionales[0];

        // Guarda el id seleccionado en el objeto para ngModel
        this.selectedAdicsId[grupo.tipoAdicional] = primerAdic._id;

        // Además, guarda en this.seleccion para tu lógica de confirmación
        const adicItem: AdicionalItemDTO = {
          _id: null,
          ordenItem: this.data.ordenItemDTO,
          adicional: primerAdic,
          valor: primerAdic.valor
        };

        this.selectedAdics[grupo.tipoAdicional] = [adicItem];
      }
    });
  }

  onRadioChange(tipo: TipoAdicional, adicionalId: number) {
    this.actualizarListaAdicSeleccionados(tipo, adicionalId);
  }

  private actualizarListaAdicSeleccionados(tipo: TipoAdicional, adicionalId: number) {
    const grupo = this.adicionalesPorTipo.find(grup => grup.tipoAdicional === tipo);
    const adicional = grupo?.adicionales.find(adic => adic._id === adicionalId);

    if (adicional) {
      const adicItem: AdicionalItemDTO = {
        _id: adicionalId,
        ordenItem: this.data.ordenItemDTO,
        adicional: adicional,
        valor: adicional.valor
      };

      // Actualizá tu seleccion para backend
      this.selectedAdics[tipo] = [adicItem];
    }
  }


  private agruparAdicionalesPorTipo(adicionales: AdicionalDTO[]): void {
    const agrupados: { [key in TipoAdicional]?: AdicionalesPorTipo } = {};

    adicionales.forEach(adicional => {
      const tipo = adicional.tipoAdicional as TipoAdicional;

      if (!agrupados[tipo]) {
        agrupados[tipo] = {
          tipoAdicional: tipo,
          descripcionGrupo: TipoAdicionalUtils.getDescripcion(tipo),
          adicionales: []
        };
      }

      agrupados[tipo]!.adicionales.push(adicional);
    });

    this.adicionalesPorTipo = Object.values(agrupados) as AdicionalesPorTipo[];
  }


  toggleMultipleSeleccion(adic: AdicionalDTO, tipo: TipoAdicional): void {
    let adicItem: AdicionalItemDTO = {
      _id: null,
      ordenItem: this.data.ordenItemDTO,
      adicional: adic,
      valor: adic.valor
    };

    if (!this.selectedAdics[tipo]) {
      this.selectedAdics[tipo] = [];
    }

    const isSelMultiple = this.isSeleccionMultiple(tipo);

    if (isSelMultiple) {
      const idx = this.selectedAdics[tipo]!.findIndex(i => i._id === adicItem._id);

      if (idx >= 0) {
        this.selectedAdics[tipo]!.splice(idx, 1);
      }
      else {
        this.selectedAdics[tipo]!.push(adicItem);
      }
    }
    else {
      this.selectedAdics[tipo] = [adicItem];
    }
  }

  confirmar(): void {
    const adicionales: AdicionalItemDTO[] = Object.values(this.selectedAdics).flat();
    this.dialogRef.close(adicionales);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  isItemSeleccionado(tipo: TipoAdicional, id: number): boolean {
    return this.selectedAdics[tipo]?.some(i => i._id === id) ?? false;
  }

  isSeleccionMultiple(tipoAdic: TipoAdicional): boolean {
    return TipoAdicionalUtils.isSeleccionMultiple(tipoAdic);
  }

  public formatearValorMoneda(valor: number, moneda: Moneda): string {
    return MonedaHelpersService.formatearValorMoneda(valor, moneda);
  }

  public getValorTotal(): number {
    let total: number = this.data.ordenItemDTO.valorUnitario; //Valor de la merc

    Object.values(this.selectedAdics).forEach(adicsPorTipo => {
      adicsPorTipo.forEach(adic => {
        total += adic.valor;
      });
    });

    return total;
  }
}
