import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { i_mapboxResp } from '../interfaces/userInterfaces/i_mapboxResp';
@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  private readonly accessToken = environment.MAPBOX_ACCESS_TOKEN;

  constructor(private http: HttpClient) {}

  getSuggestions(query: string):Observable<i_mapboxResp> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${this.accessToken}`;

    return this.http.get<i_mapboxResp>(url);
  }
}


