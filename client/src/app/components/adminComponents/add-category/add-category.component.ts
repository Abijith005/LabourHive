import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { i_category } from 'src/app/interfaces/adminInterfaces/i_category';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { getAllCategory } from 'src/app/store/admin.actions';
import { adminDataState } from 'src/app/store/admin.state';

@Component({
  selector: 'labourHive-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit,OnDestroy{
  //variable declaration

  isLoading: boolean = false
  isSubmitted = false
  selectedFiles!: File | null
  finalImage: string = ''
  addCategoryForm: FormGroup = new FormGroup({})

  private _unsubscribe$=new Subject<void>()

  constructor(private fb: FormBuilder,
    private _service: AdminService,
    private _helper: HelperService,
    private _dialogRef: MatDialogRef<AddCategoryComponent>,
    private _store: Store<adminDataState>) {

  }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      category: ['', [Validators.required]],
      basicWage: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      vectorImage: ['', [Validators.required]]
    })
  }



  get formControls() {
    return this.addCategoryForm.controls
  }
//converting image to base64 string
  ImageTOBase(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.finalImage = reader.result as string
    }
  }

  //getting each image when selected
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.files?.length! > 0) {
      this.selectedFiles = inputElement.files![0]
      this.ImageTOBase(this.selectedFiles!)
    }

  }


  onSubmit() {
    this.isSubmitted = true
    if (this.addCategoryForm.valid) {
      const formData: i_category = {
        name: this.addCategoryForm.get('category')?.value,
        basicWage: this.addCategoryForm.get('basicWage')?.value,
        vectorImage: this.finalImage!
      }
      this.isLoading = true
      this._service.addCategory(formData).pipe(takeUntil(this._unsubscribe$)).subscribe((res) => {
        this.isLoading = false
        if (res.success) {
          
          //setting datas to store
          this._store.dispatch(getAllCategory({ categories: res.categories! }))
        }
        this._dialogRef.close();
        const message = res.message
        this._helper.showToaster(message, res.success)


      })
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

}
