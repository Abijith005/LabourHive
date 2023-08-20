import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_category } from 'src/app/interfaces/adminInterfaces/i_category';
import { i_customCategory } from 'src/app/interfaces/adminInterfaces/i_customCategory';
import { i_authRes } from 'src/app/interfaces/userInterfaces/i_authRes';
import { i_LoginDatas } from 'src/app/interfaces/userInterfaces/i_login';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


  adminLogin(datas:i_LoginDatas){
   return this.http.post<i_authRes>(`/admin/login`,datas)
  }

  getAllUsers(){
    return this.http.get<{users:i_UserDetails[],success:boolean,message:string}>('/admin/getAllUsers')
  }

  blockStatus(id:string,blockStatus:boolean){
    return this.http.patch<i_authRes>(`/admin/blockStatus/`,{_id:id,blockStatus:blockStatus})
  }

  addCategory(datas:i_category){    
    return this.http.post<i_customCategory>(`/admin/addCategory`,datas)
  }

  getAllCategories(){
  //  fetch(`http://localhost:5000/admin/getAllCategories`).then(res=>{
  //   res.json()    
  //  }).then(data=>{
  //   console.log(data,'gsjhdskjk');
    
  //  })
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
     