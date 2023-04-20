import { FormGroup } from "@angular/forms";
import { DateRange } from "@angular/material/datepicker";

export interface MovimientoFiltroDTO {

  id: any;
  idTipo: any;
  nombreApellidoEntidad: any;
  fechaRangoInicialFinal: FormGroup;
  idDepartamento: any;
  keySituacion: any;
}
