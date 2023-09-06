import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_hireDatas } from 'src/app/interfaces/adminInterfaces/i_hirings';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';

@Injectable({
  providedIn: 'root'
})
export class AdminHireManagementService {

  constructor(private _http:HttpClient) { }

  getAllHireDetails(){
    return this._http.get<i_hireDatas[]>('/admin/getAllHireDetails')
  }

  approveHireCancel(hire_id:string,hireStatus:string){
    return this._http.patch<i_authRes>(`/admin/approveHireCancel`,{hire_id,hireStatus})
  }

  getComplaints(){
    return this._http.get<any>(`/admin/getComplaints`)
  }
}
