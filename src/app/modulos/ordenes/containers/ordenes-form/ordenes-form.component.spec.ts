import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesFormComponent } from './ordenes-form.component';

describe('OrdenesFormComponent', () => {
  let component: OrdenesFormComponent;
  let fixture: ComponentFixture<OrdenesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdenesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
