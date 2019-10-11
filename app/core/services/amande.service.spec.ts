import { TestBed } from '@angular/core/testing';

import { AmandeService } from './amande.service';

describe('AmandeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmandeService = TestBed.get(AmandeService);
    expect(service).toBeTruthy();
  });
});
