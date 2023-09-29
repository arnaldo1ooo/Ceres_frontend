import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiSidenavComponent } from './mi-sidenav.component';

describe('MiSidenavComponent', () => {
  let component: MiSidenavComponent;
  let fixture: ComponentFixture<MiSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
