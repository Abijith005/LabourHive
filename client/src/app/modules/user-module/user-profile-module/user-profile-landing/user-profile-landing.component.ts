import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-landing',
  templateUrl: './user-profile-landing.component.html',
  styleUrls: ['./user-profile-landing.component.css']
})
export class UserProfileLandingComponent implements OnInit{

  // variable declaration

  activeItem:string='basicInfo'

  constructor(private _route:ActivatedRoute){}

  ngOnInit(): void {
    
  }

  changeActive(item:string){
  this.activeItem=item
  }
}
