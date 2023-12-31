import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { i_RegisterDatas } from 'src/app/interfaces/userInterfaces/i_register-datas';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { i_LoginDatas } from 'src/app/interfaces/userInterfaces/i_login';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';
import { i_Password } from 'src/app/interfaces/userInterfaces/i_password';
import { i_customCategory } from 'src/app/interfaces/adminInterfaces/i_customCategory';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_paymentDetails } from 'src/app/interfaces/userInterfaces/i_paymentDetails';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  userRegister(datas: i_RegisterDatas) {
    return this._http.post<i_authRes>(`/register`, datas);
  }

  postRegisterOtp(otp: string, userData: i_RegisterDatas) {
    const datas = { ...userData, otp };
    return this._http.post<i_authRes>(`/submitOtp`, datas);
  }

  userLogin(datas: i_LoginDatas) {
    return this._http.post<i_authRes & i_UserDetails>(`/login`, datas);
  }

  forgotPassoword(email: string) {
    return this._http.post<i_authRes>(`/forgotPassword`, { email });
  }

  submitForgotPasswordOtp(otp: string) {
    return this._http.post<i_authRes>(`/submitForgotOtp`, { otp });
  }

  changePassword(data: i_Password) {
    return this._http.put<i_authRes>(`/changePassword`, data);
  }

  getUserDatas() {
    return this._http.get<i_UserDetails&i_authRes>('/getUserDatas');
  }

  getCategoryDetails(page:number) {
    return this._http.get<i_customCategory&{totalPages:number}>(`/getCategoryDetails/${page}`);
  }
  
  getAllCategoryDetails() {
    return this._http.get<i_customCategory>(`/getAllCategoryDetails`);
  }

  uploadJobProfile(data: i_jobProfile) {
    return this._http.post<i_authRes>(`/uploadJobProfile`, data);
  }

  getJobProfileDetails() {
    return this._http.get<i_jobProfile & i_authRes>(`/getJobProfileDetails`);
  }

  updateJobProfile(data: i_jobProfile) {
    return this._http.put<i_jobProfile & i_authRes>(`/updateJobProfile`, data);
  }

  getLabours(category: string,name:string,coordinates:number[]|null,page:number) {
    return this._http.post<{labours:i_jobProfile[],totalPages:number}>(`/getLabours`,{category,name,coordinates,page});
  }

  getLabourProfile(_id: string) {
    return this._http.get<i_jobProfile & i_authRes>(`/getLabourProfile/${_id}`);
  }

  payment(totalAmount: number) {
    return this._http.post<i_authRes & any>(`/hirePayment`, { totalAmount });
  }

  verifyPayment(data: i_paymentDetails) {
    return this._http.post<i_authRes>(`/hirePayment/verifyPayment`, data);
  }

  userLogout() {
    return this._http.get<i_authRes>(`/logout`);
  }
}
