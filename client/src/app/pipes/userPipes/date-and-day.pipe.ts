import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAndDay'
})
export class DateAndDayPipe implements PipeTransform {

  constructor(private _datePipe: DatePipe) {}

  transform(value: Date): { date: string; day: string } {
    const formattedDate = this._datePipe.transform(value, 'dd')!;
    const day = this._datePipe.transform(value, 'EEE')!;
    return { date: formattedDate, day };
  }

}
