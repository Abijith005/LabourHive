import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { i_userProfile } from 'src/app/interfaces/userInterfaces/userProfile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private _http:HttpClient) { }

  getHistory(){
    return this._http.get<{data:i_userProfile[],success:boolean}>(`/profile/history`)
  }

  postReview(reviewText:string,rating:number,labour_id:string,hire_id:string){
    return this._http.post<i_authRes>('/profile/postReview',{reviewText,rating,labour_id,hire_id})
  }
}
