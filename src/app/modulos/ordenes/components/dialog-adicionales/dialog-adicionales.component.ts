import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdicionalItemDTO } from '../../model/dtos/adicional-item-DTO';
import { AdicionalesService } from '../../services/adicionales.service';
import { OrdenItemDTO } from '../../model/dtos/orden-item-DTO';
import { AdicionalDTO } from '../../model/dtos/adicional-DTO';
import { TipoAdicional, TipoAdicionalUtils } from '../../enums/tipo-adicional.enum';
import { MonedaHelpersService } from 'src/app/compartido/services/moneda-helpers.service';
import { Moneda } from 'src/app/modulos/monedas/models/moneda';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AvisoHelpersService } from 'src/app/compartido/services/aviso-helpers.service';
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
    private dialogRef: MatDialogRef<DialogAdicionalesComponent>,
    private _avisoHelpersService: AvisoHelpersService
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
          adicional: primerAdic,
          valor: primerAdic.valor
        };

        this.selectedAdics[grupo.tipoAdicional] = [adicItem];
      }
    });
  }

  onRadioChange(tipo: TipoAdicional, adicionalId: number) {
    this.addListaAdicSeleccionados(tipo, adicionalId);
  }

  onCheckBoxChange(tipo: TipoAdicional, adicional: AdicionalDTO, event: MatCheckboxChange): void {

    if (event.checked) {
      this.addListaAdicSeleccionados(tipo, adicional._id);
    }
    else {
      this.removeListaAdicSeleccionados(tipo, adicional._id);
    }

  }

  private addListaAdicSeleccionados(tipo: TipoAdicional, adicionalId: number) {
    this.alterarListaAdicSeleccionados(tipo, adicionalId, false);
  }

  private removeListaAdicSeleccionados(tipo: TipoAdicional, adicionalId: number,) {
    this.alterarListaAdicSeleccionados(tipo, adicionalId, true);
  }

  private alterarListaAdicSeleccionados(tipo: TipoAdicional, adicionalId: number, isRemove: boolean) {
    const grupo = this.adicionalesPorTipo.find(grup => grup.tipoAdicional === tipo);
    const adicional = grupo?.adicionales.find(adic => adic._id === adicionalId);

    if (adicional) {
      const adicItem: AdicionalItemDTO = {
        _id: null,
        adicional: adicional,
        valor: adicional.valor
      };


      if (isRemove && this.selectedAdics[tipo]) {
        this.selectedAdics[tipo] = this.selectedAdics[tipo]!.filter(item => item.adicional._id !== adicionalId);
      }
      else {
        if (!this.isSeleccionMultiple(tipo)) {  //Si el tipo NO es selección múltiple, se reemplaza la lista entera por este único item
          this.selectedAdics[tipo] = [adicItem];
        }
        else {
          if (!this.selectedAdics[tipo]) {
            //Si aún no existe el array para este tipo, inicialízalo como array vacío
            this.selectedAdics[tipo] = [];
          }
          // Agrega el adicional a la lista de seleccionados para este tipo
          this.selectedAdics[tipo]?.push(adicItem);
        }
      }
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

  confirmar(): void {
    if (this.isAdicsFueronSeleccionados()) {
      const adicionales: AdicionalItemDTO[] = Object.values(this.selectedAdics).flat();
      this.dialogRef.close(adicionales);
    }
  }

  private isAdicsFueronSeleccionados(): boolean {
    // Recorre cada grupo de adicionales
    for (const grupoAdic of this.adicionalesPorTipo) {
      const tipo = grupoAdic.tipoAdicional;
      const seleccionados = this.selectedAdics[tipo];

      // Si no hay selección o está vacío
      if (!seleccionados || seleccionados.length === 0) {
        this._avisoHelpersService.mostrarMensaje(`Debes seleccionar al menos un item para el tipo: ${grupoAdic.descripcionGrupo}`);
        return false;
      }
    }

    return true;
  }

  public cancelar(): void {
    this.dialogRef.close();
  }

  public isItemSeleccionado(tipo: TipoAdicional, id: number): boolean {
    return this.selectedAdics[tipo]?.some(i => i._id === id) ?? false;
  }

  public isSeleccionMultiple(tipoAdic: TipoAdicional): boolean {
    return TipoAdicionalUtils.isSeleccionMultiple(tipoAdic);
  }

  public formatearValorMoneda(valor: number, moneda: Moneda): string {
    return MonedaHelpersService.formatearValorMoneda(valor, moneda);
  }

  public getValorTotal(): number {
    let total: number = this.data.ordenItemDTO.valorUnitario; //Valor de la merc

    Object.values(this.selectedAdics).forEach(selAdicsPorTipo => {
      selAdicsPorTipo.forEach(adic => {
        total += adic.valor;
      });
    });

    return total;
  }
}
