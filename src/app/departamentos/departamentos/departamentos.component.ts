import { DepartamentosService } from './../services/departamentos.service';
import { Component, OnInit } from '@angular/core';
import { Departamento } from '../model/departamento';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  departamentos$: Observable<Departamento[]>;
  columnasVisibles = ['id', 'nombre', 'sucursal', 'situacion'];

  constructor(private departamentosService: DepartamentosService) {
    this.departamentos$ = this.departamentosService.listaAllDepartamentos();
  }

  ngOnInit(): void {

  }

}
