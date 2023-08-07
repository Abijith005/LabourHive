import { Component, OnInit } from '@angular/core';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { UserService } from 'src/app/services/userServices/user.service';


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
