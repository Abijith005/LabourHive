import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { i_engagedJobs, i_jobDetails, i_postedJobs } from 'src/app/interfaces/userInterfaces/i_jobDetails';

interface i_searchData {
  coordinates: number[] | null;
  searchKey: string;
}
@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private _http: HttpClient) {}

  postJob(data: i_jobDetails) {
    return this._http.post<i_authRes>(`/jobs/postJob`, data);
  }

  getAllJobs(){
    return this._http.get<i_jobDetails[]>(`/jobs/getAllJobs`)
  }

  jobSearch(data: i_searchData) {
    return this._http.post<any>(`/jobs/jobSearch`, data);
  }

  applyjob(job_id:string){
    return this._http.post<i_authRes>(`/jobs/applyJob`,{job_id})
  }

  getPostedjobs(){
    return this._http.get<{jobs:i_postedJobs[],success:Boolean}>(`/jobs/getPostedJobs`)
  }

  editJob(data:i_jobDetails,job_id:string){
    return this._http.put<i_authRes>(`/jobs/editJob`,{...data,job_id})
  }

  expireJob(job_id:string){
    return this._http.patch<i_authRes>(`/jobs/expireJob`,{job_id})
  }

  updateApplcation(application_id:string,value:string){
    return this._http.patch<i_authRes>(`/jobs/updateApplication`,{application_id,value})
  }

  getSingleJobDatas(application_id:string){
    return this._http.get<{success:boolean,data:i_jobDetails,message:string}>(`/jobs/getSinglejobDatas/${application_id}`)
  }

  getEngagedJobs(){
    return this._http.get<{engagedJobs:i_engagedJobs[],success:boolean,message:string}>(`/jobs/getEngagedJobs`)
  }
  
  cancelJob(hire_id:string){
    return this._http.patch(`/jobs/cancelJob`,{hire_id})
  }
}
