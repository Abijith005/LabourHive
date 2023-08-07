import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { i_category } from 'src/app/interfaces/adminInterfaces/i_category';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { getAllCategory } from 'src/app/store/admin.actions';
import { adminDataState } from 'src/app/store/admin.state';

@Component({
  selector: 'labourHive-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm: FormGroup = new FormGroup({})
  finalImage!: string
  isSubmitted: boolean = false
  isLoading: boolean = false
  selectedFiles!: File | null
  category_id: string = ''
  categoryData$: Observable<i_categoryResponse> | null = null

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _fb: FormBuilder,
    private _service: AdminService,
    private _dialogRef: MatDialogRef<EditCategoryComponent>,
    private _helper: HelperService,
    private _store: Store<adminDataState>,


  ) {
    this.category_id = data.category_id
  }

  ngOnInit(): void {

    //adding validations ad setting reactive form

    this.editCategoryForm = this._fb.group({
      name: ['', [Validators.required]],
      basicWage: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      vectorImage: ['', [Validators.required]]
    })

    //Fetching category data from store

    this.categoryData$ = this._store.select('adminData').pipe(
      switchMap((state) => {
        const category = state.category?.find((category) => category._id === this.category_id);
        return category ? of(category) : EMPTY;
      })
    );

    //Setting initial values to the form

    this.categoryData$.subscribe(state => {
      this.editCategoryForm.patchValue(state)
    }).unsubscribe()

  }

  //getting form controls

  get formControls() {
    return this.editCategoryForm.controls
  }



  //convering image To Base64

  ImageTOBase(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.finalImage = reader.result as string
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.files?.length! > 0) {
      this.selectedFiles = inputElement.files![0]
      if (this.selectedFiles) {
        this.ImageTOBase(this.selectedFiles)
      }
    }

  }


  onSubmit() {

    this.isSubmitted = true
    if (this.editCategoryForm.valid) {
      const formData: i_category = {
        name: this.editCategoryForm.get('name')?.value,
        basicWage: this.editCategoryForm.get('basicWage')?.value,
        vectorImage: this.finalImage ? this.finalImage : '',
        _id: this.category_id
      }
      this.isLoading = true


      this._service.updateCategory(formData).subscribe((res) => {
        if (res.success) {
          //setting datas to store

          this._store.dispatch(getAllCategory({ categories: res.categories! }))
        }
        this.isLoading = false
        this._dialogRef.close();
        const message = res.message
        this._helper.showToaster(message, res.success)

      })


    }
  }

}
