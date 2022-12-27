import { TestBed } from '@angular/core/testing';

import { FilialesService } from './filiales.service';

describe('FilialesService', () => {
  let service: FilialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
