import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginData } from '../interfaces/user-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }



  adminLogin(data:loginData){
   return this.http.post<any>(`/admin/login`,data)
  }


}
