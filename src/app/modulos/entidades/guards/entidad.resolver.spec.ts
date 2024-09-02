import { TestBed } from '@angular/core/testing';
import { EntidadResolver } from './entidad.resolver';

describe('EntidadResolver', () => {
  let resolver: EntidadResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EntidadResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
