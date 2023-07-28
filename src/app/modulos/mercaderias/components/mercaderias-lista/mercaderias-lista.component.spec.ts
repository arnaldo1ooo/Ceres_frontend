import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercaderiasListaComponent } from './mercaderias-lista.component';

describe('MercaderiasListaComponent', () => {
  let component: MercaderiasListaComponent;
  let fixture: ComponentFixture<MercaderiasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MercaderiasListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercaderiasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
