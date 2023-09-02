import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent {
  date:Date|null=null
  isCalendarOpen = false;

  toggleCalendar(): void {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  ondd(event:Event){
    const input=event.target as HTMLInputElement
    console.log(input.value,'dskj');
    
    console.log(this.date,'dkfjkdshfhjsdfhjds');
    
  }


}
