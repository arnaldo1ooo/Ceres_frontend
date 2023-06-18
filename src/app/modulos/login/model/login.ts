import { Sucursal } from '../../sucursales/model/sucursal';
import { Departamento } from '../../departamentos/model/departamento';

export class Login {
  nombreUsuario: string = '';
  contrasena: string = '';
  sucursal: Sucursal = new Sucursal();
  departamento: Departamento = new Departamento();

  constructor() {

  }
}
