import { FormControl, FormGroup } from '@angular/forms';

export class MovimientoFiltroDTO {

  id: any | null = null;
  idTipo: any | null = null;
  nombreApellidoEntidad: any;
  fechaInicial: Date | null= null;
  fechaFinal: Date | null = null;
  idDepartamento: any | null = null;
  keySituacion: any | null = null;

  constructor() {

  }
}
