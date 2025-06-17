import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAdicionalesComponent } from './dialog-adicionales.component';

describe('DialogAdicionalesComponent', () => {
  let component: DialogAdicionalesComponent;
  let fixture: ComponentFixture<DialogAdicionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAdicionalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
