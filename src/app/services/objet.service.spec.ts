import { TestBed } from '@angular/core/testing';

import { ObjetService } from './objet.service';

describe('ObjetService', () => {
  let service: ObjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
