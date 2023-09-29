import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosListaComponent } from './movimientos-lista.component';

describe('MovimientosListaComponent', () => {
  let component: MovimientosListaComponent;
  let fixture: ComponentFixture<MovimientosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
