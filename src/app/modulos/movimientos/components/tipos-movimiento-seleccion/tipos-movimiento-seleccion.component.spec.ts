import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposMovimientoSeleccionComponent } from './tipos-movimiento-seleccion.component';

describe('TipoMovimientoSeleccionComponent', () => {
  let component: TiposMovimientoSeleccionComponent;
  let fixture: ComponentFixture<TiposMovimientoSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposMovimientoSeleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposMovimientoSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
