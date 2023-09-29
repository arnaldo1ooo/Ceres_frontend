import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPrincipalComponent } from './footer-principal.component';

describe('FooterPrincipalComponent', () => {
  let component: FooterPrincipalComponent;
  let fixture: ComponentFixture<FooterPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterPrincipalComponent]
    });
    fixture = TestBed.createComponent(FooterPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
