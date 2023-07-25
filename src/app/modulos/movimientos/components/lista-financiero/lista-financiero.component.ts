import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MovimientosService } from '../../services/movimientos.service';
import { CuentaContableDTO } from '../../model/dtos/cuentaContableDTO';
import { map, Observable, startWith } from 'rxjs';
import { HelpersService } from 'src/app/compartido/services/helpers.service';
import { CuentasContablesService } from '../../services/cuentas-contables.service';
import { AvisoHelpersService } from 'src/app/compartido/services/aviso-helpers.service';
import { ModoEdicion } from 'src/app/compartido/enums/modoEdicion.enum';

@Component({
  selector: 'app-lista-financiero',
  templateUrl: './lista-financiero.component.html',
  styleUrls: ['./lista-financiero.component.scss']
})
export class ListaFinancieroComponent {

  @Input() modoEdicion!: string;

  protected formCuentaContableToAgregar: FormGroup = this._movimientosService.crearCuentaContableFormGroup();
  protected listaCuentasContables: CuentaContableDTO[] = [];
  protected listaCuentasContablesFiltrado$: Observable<CuentaContableDTO[]> | undefined;

  constructor(
    private _movimientosService: MovimientosService,
    private _cuentasContablesService: CuentasContablesService,
    private _avisoHelpersService: AvisoHelpersService) {

  }

  ngOnInit(): void {
    this.listarFiltrarCuentasContables();
    this.verificarModoEdicion();
  }

  public displayCuentaContable(cuentaContableDTO: CuentaContableDTO): string {
    if (HelpersService.isNoNulo(cuentaContableDTO) && cuentaContableDTO._id) {
      return cuentaContableDTO.nombre
        ? cuentaContableDTO._id + ' - ' + cuentaContableDTO.nombre
        : cuentaContableDTO._id;
    }

    return '';
  }

  public agregarCuentaContable() {

  }

  private listarFiltrarCuentasContables() {
    let control = this.formCuentaContableToAgregar.get('cuentaContable');

    this._cuentasContablesService.listarTodosCuentasContablesActivos().subscribe({
      next: (respuesta: CuentaContableDTO[]) => {
        this.listaCuentasContables = respuesta;

        // Se ejecuta cuando se escribe en autocomplete
        this.listaCuentasContablesFiltrado$ = control?.valueChanges.pipe(
          startWith(''), // Se inicia con valor vacío para listar todos los registros
          map(valorAFiltrar =>
            this.listaCuentasContables?.filter(cuentaContable =>
              cuentaContable._id?.toString().includes(valorAFiltrar || '') ||
              cuentaContable.nombre?.toLocaleLowerCase().includes(valorAFiltrar || ''))
          )
        );
      },
      error: () => this._avisoHelpersService.mostrarMensaje('Error al listar Cuentas Contables', '', 4000) // Mensaje cuando ocurre un error
    });
  }

  private verificarModoEdicion() {
    switch (this.modoEdicion) {
      case ModoEdicion.MODO_NUEVO:
        break;

      case ModoEdicion.MODO_EDITAR:
        this.inhabilitarCampos();
        break;

      case ModoEdicion.MODO_VISUALIZAR:
        this.inhabilitarCampos();
        break;
    }
  }

  private inhabilitarCampos() {
    this.formCuentaContableToAgregar.disable();
  }
}
