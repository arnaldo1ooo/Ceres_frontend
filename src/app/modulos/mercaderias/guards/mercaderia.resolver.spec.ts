import { TestBed } from '@angular/core/testing';

import { MercaderiaResolver } from './mercaderia.resolver';

describe('FilialResolver', () => {
  let resolver: MercaderiaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MercaderiaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
