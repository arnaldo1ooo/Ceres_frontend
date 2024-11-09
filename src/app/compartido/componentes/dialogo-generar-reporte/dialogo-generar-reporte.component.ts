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


export interface FiltrosGenerarReporte {
  reporteSeleccionado: number
  fechaInicial: Date;
  fechaFinal: Date;
  idDepartamento: string;
}
@Component({
  selector: 'app-dialogo-generar-reporte',
  templateUrl: 'dialogo-generar-reporte.component.html',
  styleUrl: './dialogo-generar-reporte.component.scss',
  standalone: false
})

export class DialogoGenerarReporteComponent implements OnInit {
  protected listaDepartamentos: Departamento[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogoGenerarReporteComponent>,
    @Inject(MAT_DIALOG_DATA) public filtros: FiltrosGenerarReporte,
    protected dialog: MatDialog,
    private _departamentosService: DepartamentosService,
    private _loginService: LoginService,
    private _movimientosService: MovimientosService
  ) { }

  ngOnInit(): void {
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

  private listarDepartamentos() {
    this._departamentosService.listarTodosDepartamentos()
      .subscribe((respuesta: any) => {
        this.listaDepartamentos = respuesta;
      })
  }

  private filtroInicial() {
    this.filtros.fechaInicial = FechaHelpersService.getPrimerDiaDelAnho()
    this.filtros.fechaFinal = new Date();
    this.filtros.idDepartamento = this._loginService.getIdDepartamentoLogado()!;
  }

  protected generarLibroDiarioPorItem() {

    const libroDiarioRequest = {
      fechaInicio: this.filtros.fechaInicial,
      fechaFin: FechaHelpersService.asignarHoraAFechaDate(
        this.filtros.fechaFinal, HORA_FINAL, MINUTO_FINAL, SEGUNDO_FINAL),
      idMoneda: 1,
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
    switch(idCampo) {
      case 'filtroFechaInicial':
        return this.renderedFiltroFechaInicial();
      case 'filtroFechaFinal':
        return this.renderedFiltroFechaFinal();
        case 'filtroDepartamento':
        return this.renderedFiltroDepartamento();
      default:
        return true;
    }
  }

  protected disabled(idCampo: string): boolean {
    switch(idCampo) {
      case 'filtroFechaInicial':
        return this.disabledFiltroFechaInicial();
      case 'filtroFechaFinal':
        return this.disabledFiltroFechaFinal();
        case 'filtroDepartamento':
        return this.disabledFiltroDepartamento();
      default:
        return false;
    }
  }

  private renderedFiltroFechaInicial(): boolean {
    return true;
  }

  private renderedFiltroFechaFinal(): boolean {
    return true;
  }

  private renderedFiltroDepartamento(): boolean {
    return true;
  }

  private disabledFiltroFechaInicial(): boolean {
    return false;
  }

  private disabledFiltroFechaFinal(): boolean {
    return false;
  }

  private disabledFiltroDepartamento(): boolean {
    return false;
  }

}


