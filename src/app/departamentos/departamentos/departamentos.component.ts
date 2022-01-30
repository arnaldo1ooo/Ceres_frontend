import { Component, OnInit } from '@angular/core';
import { Departamento } from '../model/departamento';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  departamentos: Departamento[] = [
    { _id: '1', nombre: 'Angular', sucursal: 'Sucursal teste',situacion: 'Activo' }
  ];
  columnasVisibles = ['id', 'nombre', 'sucursal', 'situacion'];

  constructor() {

  }

  ngOnInit(): void {

  }

}
