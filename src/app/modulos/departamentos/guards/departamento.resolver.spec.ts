import { TestBed } from '@angular/core/testing';

import { DepartamentoResolver } from './departamento.resolver';

describe('DepartamentoResolver', () => {
  let resolver: DepartamentoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DepartamentoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
