import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoGenerarReporteComponent } from './dialogo-generar-reporte.component';

describe('DialogoGenerarReporteComponent', () => {
  let component: DialogoGenerarReporteComponent;
  let fixture: ComponentFixture<DialogoGenerarReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoGenerarReporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoGenerarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
