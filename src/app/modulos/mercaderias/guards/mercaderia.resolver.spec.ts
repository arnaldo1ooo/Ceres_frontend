import { TestBed } from '@angular/core/testing';

import { MercaderiaResolver } from './mercaderia.resolver';

describe('DepartamentoResolver', () => {
  let resolver: MercaderiaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MercaderiaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
