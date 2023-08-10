import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private _http:HttpClient) { }

jobSearch(data:any){
  console.log('service worked');
  
  return this._http.post<any>(`/jobs/jobSearch`,data)
}


}
