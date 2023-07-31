import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { UserService } from 'src/app/services/user.service';
import { userDataState } from 'src/app/store/user.state';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  categories:i_categoryResponse[]|null=null


  constructor(private store:Store<userDataState>,
    private service:UserService,
    private router:Router){

  }

ngOnInit(): void {
  this.service.getCategoryDetails().subscribe(res=>{
this.categories=res.categories!

  })
}

passDataToViewLabour(category:string){
this.router.navigate(['/viewLabours'],{state:{data:category}})
}

}   
