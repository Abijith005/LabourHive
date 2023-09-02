import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminJobManagementService {

  constructor(private _http:HttpClient) { }

  getJobDetails(){
    return this._http.get<any>(`/admin/getAllJobDetails`)
  }



}
