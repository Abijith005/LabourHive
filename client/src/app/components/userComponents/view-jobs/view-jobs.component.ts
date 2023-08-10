import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';

@Component({
  selector: 'labourHive-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css'],
})
export class ViewJobsComponent implements OnDestroy {
  //variable declaration

  searchKey: string = '';
  searchCoordinate: number[] | null = null;

  private _unsubscribe$ = new Subject<void>();

  constructor(private _mapBoxServices: MapboxService) {}

  fetchLocation(event: Event) {
    const input = event.target as HTMLInputElement;
    const key = input.value.trim();

    this._mapBoxServices.getSuggestions(key).pipe(takeUntil(this._unsubscribe$)).subscribe(res=>{
      console.log(res);
      
    })
  }
  searchJobs() {}

  ngOnDestroy(): void {

    this._unsubscribe$.next();
    this._unsubscribe$.complete();
   
  }
}
