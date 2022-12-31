import { TestBed } from '@angular/core/testing';

import { FilialResolver } from './filial.resolver';

describe('FilialResolver', () => {
  let resolver: FilialResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FilialResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
