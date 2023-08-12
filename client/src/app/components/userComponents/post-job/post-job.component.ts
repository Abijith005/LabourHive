import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs';
import { i_category } from 'src/app/interfaces/adminInterfaces/i_category';
import { i_mapboxResp } from 'src/app/interfaces/userInterfaces/i_mapboxResp';
import { i_suggestions } from 'src/app/interfaces/userInterfaces/i_suggestions';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';

@Component({
  selector: 'labourHive-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css'],
})
export class PostJobComponent implements OnInit {
  // variable declarations
  postJobForm: FormGroup = new FormGroup({});
  suggestions!: i_suggestions[];
  location: string = '';
  coordianates!: number[];
  categories!:i_category[]
  isSubmitted:boolean=false

  private _unsubscribe$ = new Subject<void>();
  constructor(
    private _matDialog: MatDialogRef<PostJobComponent>,
    private _fb: FormBuilder,
    private _mapboxServices: MapboxService
  ) {}

  ngOnInit(): void {
    this.postJobForm = this._fb.group({
      category: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      requiredLabour: ['', [Validators.required]],
      offeredWage: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });

    // get categories from local storage
   this.categories=JSON.parse(localStorage.getItem('categories')!)
  }

  getSuggestions() {    
    this.formControl['location'].valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((key: string) => {
          return this._mapboxServices.getSuggestions(key);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((res: i_mapboxResp) => {
        this.suggestions = res.features.map((feature) => ({
          location: feature.place_name,
          coordinates: feature.center,
        }));
      });
  }

  public get formControl() {
    return this.postJobForm.controls;
  }

  slectSuggestion(feature: i_suggestions) {
    this.location = feature.location;
    this.coordianates = feature.coordinates;
    this.suggestions = [];
  }

  close() {
    this._matDialog.close();
  }

  onSubmit() {
    this.isSubmitted=true
    if (!this.postJobForm.valid) {
      return
    }
  }
}
