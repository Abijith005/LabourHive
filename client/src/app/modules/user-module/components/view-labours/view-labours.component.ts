import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { UserService } from 'src/app/modules/user-module/userServices/user.service';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';

@Component({
  selector: 'labourHive-view-labours',
  templateUrl: './view-labours.component.html',
  styleUrls: ['./view-labours.component.css'],
})
export class ViewLaboursComponent implements OnInit, OnDestroy {
  labourDetails: i_jobProfile[] | null = null;
  category!: string;
  isLoading = false;
  searchKey: string = '';
  searchLocation: string = '';
  searchCoordinate: number[] | null = null;
  suggessions: i_suggestions[] | null = null;
  selectedPage:number=1
  totalPages!:number

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private service: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mapBoxServices: MapboxService
  ) {}

  ngOnInit(): void {
    this.category = this._route.snapshot.paramMap.get('category')!;
    this.isLoading = true;
    this.service
      .getLabours(this.category, this.searchKey, this.searchCoordinate,this.selectedPage)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.labourDetails = res.labours;
        this.totalPages=res.totalPages
        this.isLoading = false;
      });
  }

  viewJobProfile(labour_id: string) {
    this._router.navigate([`/viewJobProfile/${labour_id}`]);
  }

  searchJobs() {
    this.isLoading = true;
    this.selectedPage=1
    this.service
      .getLabours(this.category, this.searchKey, this.searchCoordinate,this.selectedPage)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.labourDetails = res.labours;
        this.totalPages=res.totalPages
        this.isLoading = false;
      });
  }

  selectLocation(feature: i_suggestions) {
    this.searchLocation = feature.location;
    this.searchCoordinate = feature.coordinates;
    this.suggessions = [];
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
      this.isLoading=true
      this.selectedPage=1
      this.service
        .getLabours(this.category, this.searchKey, this.searchCoordinate,this.selectedPage)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          this.labourDetails = res.labours;
          this.totalPages=res.totalPages
          this.isLoading = false;
        });
    }
  }

  searchByKey(){
    if (!this.searchKey) {
      this.isLoading=true
      this.selectedPage=1
      this.service
        .getLabours(this.category, this.searchKey, this.searchCoordinate,this.selectedPage)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((res) => {
          this.labourDetails = res.labours;
          this.totalPages=res.totalPages
          this.isLoading = false;
        });
    }
  }

  selectPage(pageNumber:number){
    if (!pageNumber||pageNumber>this.totalPages) {
      return
    }
    this.selectedPage=pageNumber
    this.isLoading=true
    this.service
      .getLabours(this.category, this.searchKey, this.searchCoordinate,this.selectedPage)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.labourDetails = res.labours;
        this.isLoading = false;
      });

  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
