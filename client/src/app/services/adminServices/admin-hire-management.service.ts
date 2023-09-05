import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminHireManagementService {

  constructor(private _http:HttpClient) { }

  getAllHireDetails(){
    return this._http.get<any>('/admin/getAllHireDetails')
  }
}
