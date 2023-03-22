import { TestBed } from '@angular/core/testing';

import { ErrorHelpersService } from './error-helpers.service';

describe('ErrorHelpersService', () => {
  let service: ErrorHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
