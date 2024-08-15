import { Sucursal } from '../../sucursales/model/sucursal.model';
import { Departamento } from '../../departamentos/model/departamento.model';

export class Login {
  nombreUsuario: string = '';
  contrasena: string = '';
  sucursal: Sucursal = new Sucursal();
  departamento: Departamento = new Departamento();

  constructor() {

  }
}
