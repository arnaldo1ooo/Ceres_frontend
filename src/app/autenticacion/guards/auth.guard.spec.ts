import { AuthGuard } from './auth.guard';
import { TestBed } from '@angular/core/testing';

describe('AutenticacionGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
