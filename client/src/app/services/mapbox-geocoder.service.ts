import { Injectable } from '@angular/core';
import { MapboxGeocoding } from '@mapbox/mapbox-sdk/services/geocoding';

@Injectable({
  providedIn: 'root'
})
export class MapboxGeocoderService {

  private geocoder:MapboxGeocoding

  constructor() { }
}
