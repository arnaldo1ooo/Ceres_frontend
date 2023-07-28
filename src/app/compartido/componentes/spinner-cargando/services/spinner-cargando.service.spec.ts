import { TestBed } from '@angular/core/testing';

import { SpinnerCargandoService } from './spinner-cargando.service';

describe('SpinnerCargandoService', () => {
  let service: SpinnerCargandoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerCargandoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
