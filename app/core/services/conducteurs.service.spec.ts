import { TestBed } from '@angular/core/testing';

import { ConducteursService } from './conducteurs.service';

describe('ConducteursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConducteursService = TestBed.get(ConducteursService);
    expect(service).toBeTruthy();
  });
});
