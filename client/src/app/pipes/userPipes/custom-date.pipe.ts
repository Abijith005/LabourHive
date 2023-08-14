import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date): string {
    if (!value) {
      return value
    }
    const datePipe=new DatePipe('en-US')
    const formattedDate=datePipe.transform(value,'dd-MMM-yyyy')
    const parts=formattedDate?.split('-')
    const day=parts?.[0]
    const month=parts?.[1]
    const year=parts?.[2]

    return `${day}-${month}-${year}`
    

  }

}
