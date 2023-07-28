import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoErrorComponent } from './dialogo-error.component';

describe('DialogoErrorComponent', () => {
  let component: DialogoErrorComponent;
  let fixture: ComponentFixture<DialogoErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
