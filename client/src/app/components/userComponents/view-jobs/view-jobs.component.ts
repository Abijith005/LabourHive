import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';
import { JobService } from 'src/app/services/userServices/job.service';

@Component({
  selector: 'labourHive-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css'],
})
export class ViewJobsComponent implements OnDestroy {
  //variable declaration

  searchKey: string = '';
  searchLocation: string = '';
  searchCoordinate: number[] | null = null;
  suggessions: i_suggestions[] | null = null;

  private _unsubscribe$ = new Subject<void>();

  constructor(private _mapBoxServices: MapboxService,
    private _jobSevices:JobService) {}

  fetchLocation(event: Event) {
    const input = event.target as HTMLInputElement;
    const key = input.value.trim();

    this._mapBoxServices
      .getSuggestions(key)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.suggessions = res.features.map((feature) => ({
          location: feature.place_name,
          coordinates: feature.center,
        }));
      });
  }

  selectLocation(feature: i_suggestions) {
    this.searchLocation = feature.location;
    this.searchCoordinate=feature.coordinates
    this.suggessions = [];
  }
  searchJobs() {
    console.log('clickedd');
    
    this._jobSevices.jobSearch({coordinates:this.searchCoordinate,searchKey:this.searchKey}).subscribe(res=>{
      console.log(res,'searchhhhhhhhhhhhhhhhhhh');
      
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
