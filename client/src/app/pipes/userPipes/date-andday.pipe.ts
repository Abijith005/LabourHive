import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAndday'
})
export class DateAnddayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
