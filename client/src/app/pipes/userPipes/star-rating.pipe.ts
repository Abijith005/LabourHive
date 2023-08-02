import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  transform(rating: number): number[] {

    const stars:number[]=[]
    for (let i = 0; i < 5; i++) {

      if (rating>=1) {
        stars.push(1)
        rating--
      }
      else if (rating>0&&rating<1) {
        stars.push(.5)
        rating--
      }
      else{
        stars.push(0)
      }
      
    }
    
    return stars;
  }

}
