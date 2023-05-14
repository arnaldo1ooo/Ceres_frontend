import { FormControl, FormGroup } from '@angular/forms';

export class MovimientoFiltroDTO {

  id: any | null = null;
  idTipo: any | null = null;
  nombreApellidoEntidad: any;
  fechaRangoInicialFinal: FormGroup = new FormGroup({
    fechaInicial: new FormControl(''),
    fechaFinal: new FormControl('')
  });;
  idDepartamento: any | null = null;
  keySituacion: any | null = null;

  constructor() {

  }
}
