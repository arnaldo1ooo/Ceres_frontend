import { TestBed } from '@angular/core/testing';

import { TiposMovimientoService } from './tipos-movimiento.service';

describe('TiposMovimientoService', () => {
  let service: TiposMovimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposMovimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
