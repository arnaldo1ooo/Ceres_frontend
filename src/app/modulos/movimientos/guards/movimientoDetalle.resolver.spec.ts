import { TestBed } from '@angular/core/testing';
import { MovimientoDetalleResolver } from './movimientoDetalle.resolver';

describe('MovimientoDetalleResolver', () => {
  let resolver: MovimientoDetalleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovimientoDetalleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
