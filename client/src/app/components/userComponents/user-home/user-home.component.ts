import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { i_categoryResponse } from 'interfaces/adminInterfaces/i_categoryResponse';
import { UserService } from 'src/app/services/user.service';
import { userDataState } from 'src/app/store/user.state';

@Component({
  selector: 'labourHive-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  categories!:i_categoryResponse[]


  constructor(
    private service:UserService,
  ){

  }

ngOnInit(): void {
  this.service.getCategoryDetails().subscribe(res=>{
this.categories=res.categories!
localStorage.setItem('categories',JSON.stringify(this.categories))

  })
}



}   
