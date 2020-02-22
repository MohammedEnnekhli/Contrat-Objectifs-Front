import { TestBed } from '@angular/core/testing';

import { ContratObjectifsService } from './contrat-objectifs.service';

describe('ContratObjectifsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContratObjectifsService = TestBed.get(ContratObjectifsService);
    expect(service).toBeTruthy();
  });
});
