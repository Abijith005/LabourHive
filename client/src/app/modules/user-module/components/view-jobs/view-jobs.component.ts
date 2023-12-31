import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { i_jobDetails } from 'src/app/interfaces/userInterfaces/i_jobDetails';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';
import { JobService } from 'src/app/modules/user-module/userServices/job.service';
import { SingleJobComponent } from '../single-job/single-job.component';

@Component({
  selector: 'labourHive-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css'],
})
export class ViewJobsComponent implements OnInit, OnDestroy {
  //variable declaration

  searchKey: string = '';
  searchLocation: string = '';
  searchCoordinate: number[] | null = null;
  suggessions: i_suggestions[] | null = null;
  jobs: i_jobDetails[] | null = null;
  selectedPage: number = 1;
  totalPages!: number;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _mapBoxServices: MapboxService,
    private _jobSevices: JobService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._jobSevices
      .jobSearch({
        coordinates: this.searchCoordinate,
        searchKey: this.searchKey,
        page: this.selectedPage,
      })
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.totalPages=res.totalPages
        this.jobs = res.jobs;
      });
  }

  fetchLocation(event: Event) {
    const input = event.target as HTMLInputElement;
    const key = input.value.trim();
    if (key) {
      this._mapBoxServices
        .getSuggestions(key)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          this.suggessions = res.features.map((feature) => ({
            location: feature.place_name,
            coordinates: feature.center,
          }));
        });
    } else {
      this.searchCoordinate = null;
      this.suggessions = null;
      this.selectedPage=1
      this._jobSevices
        .jobSearch({
          coordinates: this.searchCoordinate,
          searchKey: this.searchKey,
          page: this.selectedPage,
        })
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          this.totalPages=res.totalPages
          this.jobs = res.jobs;
        });
    }
  }

  selectLocation(feature: i_suggestions) {
    this.searchLocation = feature.location;
    this.searchCoordinate = feature.coordinates;
    this.suggessions = [];
  }

  searchJobs() {
    this.selectedPage=1
    this._jobSevices
      .jobSearch({
        coordinates: this.searchCoordinate,
        searchKey: this.searchKey,
        page: this.selectedPage,
      })
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.totalPages=res.totalPages
        this.jobs = res.jobs;
      });
  }

  searchInput() {
    if (!this.searchKey) {
      this.selectedPage=1
      this._jobSevices
        .jobSearch({
          coordinates: this.searchCoordinate,
          searchKey: this.searchKey,
          page: this.selectedPage,
        })
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          this.totalPages=res.totalPages
          this.jobs = res.jobs;
        });
    }
  }

  selectPage(pageNumber: number) {    
    if (!pageNumber || pageNumber > this.totalPages) {
      return;
    }
    this.selectedPage=pageNumber
    this._jobSevices
      .jobSearch({
        coordinates: this.searchCoordinate,
        searchKey: this.searchKey,
        page: this.selectedPage,
      })
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.jobs = res.jobs;
      });
  }

  clear() {
    this.suggessions = [];
  }

  viewSingleJob(job: i_jobDetails) {
    this._matDialog.open(SingleJobComponent, {
      width: '580px',
      height: 'auto',
      maxHeight: '900px',
      data: job,
      disableClose: true,
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
