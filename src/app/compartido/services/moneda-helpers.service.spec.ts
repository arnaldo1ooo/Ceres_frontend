import { TestBed } from '@angular/core/testing';

import { MonedaHelpersService } from './moneda-helpers.service';

describe('MonedaHelpersService', () => {
  let service: MonedaHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonedaHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
