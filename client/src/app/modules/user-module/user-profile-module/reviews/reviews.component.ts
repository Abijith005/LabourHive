import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../userServices/user-profile.service';
import { i_review } from 'src/app/interfaces/userInterfaces/i_review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{

  // variable declarations
  reviews:i_review|null=null


  constructor(private _profileService:UserProfileService){}
  
  ngOnInit(): void {
    this._profileService.getReviews().subscribe(res=>{
      this.reviews=res      
    })
  }

}
