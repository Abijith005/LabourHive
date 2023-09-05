import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { i_hireDatas } from 'src/app/interfaces/adminInterfaces/i_hirings';

@Injectable({
  providedIn: 'root'
})
export class AdminHireManagementService {

  constructor(private _http:HttpClient) { }

  getAllHireDetails(){
    return this._http.get<i_hireDatas[]>('/admin/getAllHireDetails')
  }
}
