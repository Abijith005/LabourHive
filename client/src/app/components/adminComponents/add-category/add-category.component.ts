import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { Store } from '@ngrx/store';
import { i_category } from 'src/app/interfaces/adminInterfaces/i_category';
import { AdminService } from 'src/app/services/admin.service';
import { HelperService } from 'src/app/services/helper.service';
import { getAllCategory } from 'src/app/store/admin.actions';
import { adminDataState } from 'src/app/store/admin.state';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  isLoading: boolean = false
  isSubmitted = false
  selectedFiles!: File | null
  finalImage: string = ''
  addCategoryForm: FormGroup = new FormGroup({})
  constructor(private fb: FormBuilder,
    private service: AdminService,
    private helper: HelperService,
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private store: Store<adminDataState>) {

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
      this.service.addCategory(formData).subscribe((res) => {
        this.isLoading = false
        if (res.success) {
          this.store.dispatch(getAllCategory({ categories: res.categories! }))
        }
        this.dialogRef.close();
        const message = res.message
        this.helper.showToaster(message, res.success)


      })
    }
  }

}
