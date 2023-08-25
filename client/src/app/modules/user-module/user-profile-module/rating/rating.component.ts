import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  // variable declarations
  stars:number[]=[0,1,2,3,4]
  rating:number=0



  rate(value:number){
this.rating=value+1


  }

}
