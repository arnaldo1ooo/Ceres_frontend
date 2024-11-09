import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departamento } from 'src/app/modulos/departamentos/model/departamento.model';
import { DepartamentosService } from 'src/app/modulos/departamentos/services/departamentos.service';
import { FechaHelpersService } from '../../services/fecha-helpers.service';
import { HelpersService } from '../../services/helpers.service';
import { LoginService } from '../../../modulos/login/services/login.service';
import { DialogoErrorComponent } from '../dialogo-error/dialogo-error.component';
import { JasperService } from '../../services/jasper-helpers.service';
import { MovimientosService } from '../../../modulos/movimientos/services/movimientos.service';
import { HORA_FINAL, MINUTO_FINAL, SEGUNDO_FINAL, ID_LIBRO_DIARIO_POR_ITEM } from '../../constantes/constantes';
import { Moneda } from 'src/app/modulos/monedas/models/moneda';
import { MonedasService } from '../../../modulos/monedas/services/monedas.service';


export interface FiltrosGenerarReporte {
  reporteSeleccionado: number
  fechaInicial: Date;
  fechaFinal: Date;
  idMoneda: string;
  idDepartamento: string;
}
@Component({
  selector: 'app-dialogo-generar-reporte',
  templateUrl: 'dialogo-generar-reporte.component.html',
  styleUrl: './dialogo-generar-reporte.component.scss',
  standalone: false
})

export class DialogoGenerarReporteComponent implements OnInit {
  protected listaMonedas: Moneda[] = [];
  protected listaDepartamentos: Departamento[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogoGenerarReporteComponent>,
    @Inject(MAT_DIALOG_DATA) public filtros: FiltrosGenerarReporte,
    protected dialog: MatDialog,
    private _monedasService: MonedasService,
    private _departamentosService: DepartamentosService,
    private _loginService: LoginService,
    private _movimientosService: MovimientosService
  ) { }

  ngOnInit(): void {
    this.listarMonedas();
    this.listarDepartamentos();
    this.filtroInicial();
  }

  onGenerarReporte(): void {
    switch (this.filtros.reporteSeleccionado) {
      case ID_LIBRO_DIARIO_POR_ITEM: {
        this.generarLibroDiarioPorItem();
        break;
      }
      default: {
        break;
      }
    }
  }

  onSalir(): void {
    this.dialogRef.close();
  }

  protected compararOpcionesSelect(opcion: any, opcionSeleccionada: any): boolean {
    return HelpersService.compararOpcionesSelect(opcion, opcionSeleccionada);
  }

  protected onError(errorMsg: string) {
    this.dialog.open(DialogoErrorComponent, {
      data: errorMsg
    });
  }

  private listarMonedas() {
    this._monedasService.listarTodosMonedas()
      .subscribe((respuesta: any) => {
        this.listaMonedas = respuesta;
      })
  }

  private listarDepartamentos() {
    this._departamentosService.listarTodosDepartamentos()
      .subscribe((respuesta: any) => {
        this.listaDepartamentos = respuesta;
      })
  }

  private filtroInicial() {
    this.filtros.fechaInicial = FechaHelpersService.getPrimerDiaDelAnho()
    this.filtros.fechaFinal = new Date();
    this.filtros.idMoneda = '1'; //Guarani por default
    this.filtros.idDepartamento = this._loginService.getIdDepartamentoLogado()!;
  }

  protected generarLibroDiarioPorItem() {

    const libroDiarioRequest = {
      fechaInicio: this.filtros.fechaInicial,
      fechaFin: FechaHelpersService.asignarHoraAFechaDate(
        this.filtros.fechaFinal, HORA_FINAL, MINUTO_FINAL, SEGUNDO_FINAL),
      idMoneda: Number(this.filtros.idMoneda),
      idDepartamento: Number(this.filtros.idDepartamento)
    };

    return this._movimientosService
      .imprimirLibroDiarioPorItemA4Pdf(
        libroDiarioRequest.fechaInicio, libroDiarioRequest.fechaFin,
        libroDiarioRequest.idMoneda, libroDiarioRequest.idDepartamento)
      .subscribe({
        next: (respuesta: Blob) => {
          JasperService.mostrarPdf(respuesta);
        },
        error: (error) => {
          console.error('Error al imprimir Libro Diario por Item: ', error);
          this.onError('Error al imprimir Libro Diario por Item');
        },
        complete: () => {
        }
      });
  }

  protected rendered(idCampo: string): boolean {
    switch (idCampo) {
      case 'filtroFechaInicial':
        return this.renderedFiltroFechaInicial();
      case 'filtroFechaFinal':
        return this.renderedFiltroFechaFinal();
      case 'filtroMoneda':
        return this.renderedFiltroMoneda();
      case 'filtroDepartamento':
        return this.renderedFiltroDepartamento();
      default:
        return true;
    }
  }

  protected disabled(idCampo: string): boolean {
    switch (idCampo) {
      case 'filtroFechaInicial':
        return this.disabledFiltroFechaInicial();
      case 'filtroFechaFinal':
        return this.disabledFiltroFechaFinal();
      case 'filtroMoneda':
        return this.disabledFiltroMoneda();
      case 'filtroDepartamento':
        return this.disabledFiltroDepartamento();
      default:
        return false;
    }
  }

  //RENDERED
  private renderedFiltroFechaInicial(): boolean {
    return true;
  }

  private renderedFiltroFechaFinal(): boolean {
    return true;
  }

  private renderedFiltroMoneda(): boolean {
    return true;
  }

  private renderedFiltroDepartamento(): boolean {
    return true;
  }

  //DISABLED
  private disabledFiltroFechaInicial(): boolean {
    return false;
  }

  private disabledFiltroFechaFinal(): boolean {
    return false;
  }

  private disabledFiltroMoneda(): boolean {
    return true;
  }

  private disabledFiltroDepartamento(): boolean {
    return false;
  }

}


