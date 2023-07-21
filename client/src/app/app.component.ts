import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './store/user.state';
import { login } from './store/user.actions';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LabourHiveFrontEnd';

  constructor(private store:Store<AuthState>,
    private service:UserService){

  }

  ngOnInit(): void {
    this.service.getUserDatas().subscribe(res=>{
      this.store.dispatch(login({userDatas:res}))
    })

  }

 
}
