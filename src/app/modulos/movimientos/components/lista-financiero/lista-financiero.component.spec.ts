import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFinancieroComponent } from './lista-financiero.component';

describe('ListaFinancieroComponent', () => {
  let component: ListaFinancieroComponent;
  let fixture: ComponentFixture<ListaFinancieroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaFinancieroComponent]
    });
    fixture = TestBed.createComponent(ListaFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
