import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { i_LoginDatas } from '../interfaces/userInterfaces/i_login';
import { i_RegisterDatas } from '../interfaces/userInterfaces/i_register-datas';
import { i_Password } from '../interfaces/userInterfaces/i_password';
import { i_authRes } from '../interfaces/userInterfaces/i_authRes';
import { i_UserDetails } from '../interfaces/userInterfaces/i_user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }


  userRegister(datas:i_RegisterDatas){
return this.http.post<i_authRes>(`/register`,datas)
  }

  postRegisterOtp(otp:string,userData:i_RegisterDatas){
    const datas={...userData,otp}
    return this.http.post<i_authRes>(`/submitOtp`,datas)
  }

  userLogin(datas:i_LoginDatas){
   return this.http.post<i_authRes&i_UserDetails>(`/login`,datas)
  }

  forgotPassoword(email:string){
    return this.http.post<i_authRes>(`/forgotPassword`,{email})
  }

  submitForgotPasswordOtp(otp:string){
    return this.http.post<i_authRes>(`/submitForgotOtp`,{otp})
  }

  changePassword(data:i_Password){
    return this.http.put<i_authRes>(`/changePassword`,data)

  }

  getUserDatas(){
    return this.http.get<i_UserDetails>('/getUserDatas')
  }

  userLogout(){
    return this.http.get<i_authRes>(`/logout`)
  }


}
