import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialesListaComponent } from './filiales-lista.component';

describe('FilialesListaComponent', () => {
  let component: FilialesListaComponent;
  let fixture: ComponentFixture<FilialesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilialesListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilialesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
