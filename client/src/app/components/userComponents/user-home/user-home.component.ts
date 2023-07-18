import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userDetails } from 'src/app/interfaces/user-interfaces';
import { AppState } from 'src/app/state/user.state';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {


  constructor(private store:Store<AppState>){

  }

ngOnInit(): void {
}

}
