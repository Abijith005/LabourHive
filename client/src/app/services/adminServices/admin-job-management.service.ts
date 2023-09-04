import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_allJobs } from 'src/app/interfaces/adminInterfaces/i_allJobs';
import { i_hirings } from 'src/app/interfaces/adminInterfaces/i_hirings';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';

@Injectable({
  providedIn: 'root'
})
export class AdminJobManagementService {

  constructor(private _http:HttpClient) { }

  getJobDetails(filter:string,search:string,page:number,startDate:Date|null,endDate:Date|null){
    return this._http.get<i_allJobs[]>(`/admin/getAllJobDetails?filter=${filter}&search=${search}&page=${page}&startDate=${startDate}&endDate=${endDate}`)
  }

  getHirings(job_id:string){
    return this._http.get<i_hirings[]>(`/admin/getHirings?job_id=${job_id}`)
  }

  changeJobStatus(job_id:string,status:string){
   return this._http.patch<i_authRes>(`/admin/changeJobStatus`,{job_id,status})
  }

  updatePayment(hire_id:string,payment:boolean,user_id:string,amount:number){
    return this._http.patch<i_authRes>(`/admin/updatePayment`,{hire_id,payment,user_id,amount})
  }



}
