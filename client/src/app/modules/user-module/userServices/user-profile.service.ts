import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { i_review } from 'src/app/interfaces/userInterfaces/i_review';
import { i_userProfile } from 'src/app/interfaces/userInterfaces/i_userProfile';
import { i_userSchedule } from 'src/app/interfaces/userInterfaces/i_userSchedule';
import { i_walletDetails } from 'src/app/interfaces/userInterfaces/i_walletDetails';
import { i_withdrawData } from 'src/app/interfaces/userInterfaces/i_withdrawData';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private _http:HttpClient) { }

  getHistory(){
    return this._http.get<{data:i_userProfile[],success:boolean}>(`/profile/history`)
  }

  postReview(reviewText:string,rating:number,labour_id:string,hire_id:string){
    return this._http.post<{success:boolean,message:string,review_id:string}>('/profile/postReview',{reviewText,rating,labour_id,hire_id})
  }

  registerComplaint(complaintText:string,hire_id:string){
    return this._http.post<{success:boolean,message:string,complaint_id:string}>('/profile/registerComplaint',{complaintText,hire_id})
  }

  getSchedules(){
    return this._http.get<i_userSchedule[]>(`/profile/getSchedules`)
  }

  getReviews(){
    return this._http.get<i_review>(`/profile/getReviews`)
  }

  getWallet(){
    return this._http.get<i_walletDetails[]>(`/profile/getWallet`)
  }

  withdrawRequest(data:i_withdrawData){
    return this._http.post<i_authRes>(`/profile/withdrawalRequest`,data)
  }

  updateUserProfile(data:{name?:string,email?:string,mobileNumber?:string,profilePicture?:string}){    
  return this._http.patch<i_authRes>(`/profile/editBasciInfo`,data)
}

changeEmail(email:string){
  return this._http.patch<{otp:string}>(`/profile/changeEmail`,{email})
}

}
