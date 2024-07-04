import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadFormComponent } from './entidad-form.component';

describe('DepartamentoFormComponent', () => {
  let component: EntidadFormComponent;
  let fixture: ComponentFixture<EntidadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntidadFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
