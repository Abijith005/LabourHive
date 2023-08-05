import { TestBed } from '@angular/core/testing';

import { WindoRefService } from './windo-ref.service';

describe('WindoRefService', () => {
  let service: WindoRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindoRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
