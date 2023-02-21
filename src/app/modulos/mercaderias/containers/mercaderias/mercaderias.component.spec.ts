import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercaderiasComponent } from './mercaderias.component';

describe('FilialesComponent', () => {
  let component: MercaderiasComponent;
  let fixture: ComponentFixture<MercaderiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MercaderiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MercaderiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
