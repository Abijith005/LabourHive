import { Injectable } from '@angular/core';
import { loginData, password, registerDatas } from '../interfaces/user-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }


  userRegister(datas:registerDatas){
return this.http.post<any>(`/register`,datas)
  }

  postRegisterOtp(otp:string,userData:registerDatas){
    const datas={...userData,otp}
    return this.http.post<any>(`/submitOtp`,datas)
  }

  userLogin(datas:loginData){
   return this.http.post<any>(`/login`,datas)
  }

  forgotPassoword(email:string){
    return this.http.post<any>(`/forgotPassword`,{email})
  }

  submitForgotPasswordOtp(otp:string){
    return this.http.post<any>(`/submitForgotOtp`,{otp})
  }

  changePassword(data:password){
    return this.http.put<any>(`/changePassword`,data)

  }

  getUserDatas(){
    return this.http.get<any>('/getUserDatas')
  }

  userLogout(){
    return this.http.get<any>(`/logout`)
  }



}
