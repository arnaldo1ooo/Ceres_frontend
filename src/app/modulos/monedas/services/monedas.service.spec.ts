import { TestBed } from '@angular/core/testing';

import { TiposMovimientoService } from './monedas.service';

describe('MonedasService', () => {
  let service: MonedasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonedasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
