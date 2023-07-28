import { TestBed } from '@angular/core/testing';

import { FechaHelpersService } from './fecha-helpers.service';

describe('FechaHelpersService', () => {
  let service: FechaHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechaHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
