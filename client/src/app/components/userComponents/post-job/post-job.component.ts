import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MapboxService } from 'src/app/services/commonServices/mapbox.service';

@Component({
  selector: 'labourHive-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css'],
})
export class PostJobComponent implements OnInit {
  // variable declarations
  postJobForm: FormGroup = new FormGroup({});

  private _unsubscribe=new Subject<void>()
  constructor(
    private _matDialog: MatDialogRef<PostJobComponent>,
    private _fb: FormBuilder,
    private _mapboxServices:MapboxService
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
  }

  public get formControl() {
    return this.postJobForm.controls;
  }

  // fetch location from mapbox
  fetchLocation(event: Event) {
    const input = event.target as HTMLInputElement;
    const key = input.value.trim();

    this._mapboxServices.getSuggestions(key).pipe(takeUntil(this._unsubscribe),switchMap(val)).

  }
  close() {
    this._matDialog.close();
  }

  onSubmit() {
    console.log('form submitted');
  }
}
