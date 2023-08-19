import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { i_jobDetails } from 'src/app/interfaces/userInterfaces/i_jobDetails';

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
}
