import { TestBed } from '@angular/core/testing';

import { MapboxGeocoderService } from './mapbox-geocoder.service';

describe('MapboxGeocoderService', () => {
  let service: MapboxGeocoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapboxGeocoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
