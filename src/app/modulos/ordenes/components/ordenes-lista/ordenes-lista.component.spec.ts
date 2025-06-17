import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesListaComponent } from './ordenes-lista.component';

describe('OrdenesListaComponent', () => {
  let component: OrdenesListaComponent;
  let fixture: ComponentFixture<OrdenesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdenesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
