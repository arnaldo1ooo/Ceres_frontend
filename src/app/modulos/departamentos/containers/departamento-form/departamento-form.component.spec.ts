import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoFormComponent } from './departamento-form.component';

describe('DepartamentoFormComponent', () => {
  let component: DepartamentoFormComponent;
  let fixture: ComponentFixture<DepartamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartamentoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
