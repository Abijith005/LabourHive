import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_LoginDatas } from '../interfaces/userInterfaces/i_login';
import { i_UserDetails } from '../interfaces/userInterfaces/i_user-details';
import { i_authRes } from '../interfaces/userInterfaces/i_authRes';
import { i_category } from '../interfaces/adminInterfaces/i_category';
import { i_customCategory } from '../interfaces/adminInterfaces/i_customCategory';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


  adminLogin(datas:i_LoginDatas){
   return this.http.post<i_authRes>(`/admin/login`,datas)
  }

  getAllUsers(){
    return this.http.get<i_UserDetails[]>('/admin/getAllUsers')
  }

  blockStatus(id:string,blockStatus:boolean){
    return this.http.patch<i_authRes>(`/admin/blockStatus/`,{_id:id,blockStatus:blockStatus})
  }

  addCategory(datas:i_category){    
    return this.http.post<i_customCategory>(`/admin/addCategory`,datas)
  }

  getAllCategories(){
    return this.http.get<i_customCategory>(`/admin/getAllCategories`)
  }

  updateCategory(data:i_category){
    return this.http.put<i_customCategory>(`/admin/updateCategory`,data)
  }

  blockCategory(_id:string,status:boolean){
    return this.http.patch<i_customCategory>(`/admin/blockCategory`,{_id,status})
  }

  deleteCategory(_id:string){
    return this.http.delete<i_customCategory>(`/admin/deleteCategory/${_id}`)
  }



}
     