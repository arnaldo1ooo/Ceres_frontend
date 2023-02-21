import { TestBed } from '@angular/core/testing';

import { MercaderiasService } from './mercaderias.service';

describe('FilialesService', () => {
  let service:MercaderiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercaderiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
