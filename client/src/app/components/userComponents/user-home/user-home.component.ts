import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { UserService } from 'src/app/services/user.service';
import { AuthState } from 'src/app/store/user.state';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  categories:i_categoryResponse[]|null=null


  constructor(private store:Store<AuthState>,
    private service:UserService){

  }

ngOnInit(): void {
  this.service.getCategoryDetails().subscribe(res=>{
this.categories=res.categories!

  })
}

}   
