import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { i_category } from 'src/app/interfaces/adminInterfaces/i_category';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  isSubmitted=false
  selectedFiles:File|null=null
  addCategoryForm:FormGroup=new FormGroup({})
  constructor(private fb:FormBuilder,
    private service:AdminService){

  }

  ngOnInit(): void {
    this.addCategoryForm=this.fb.group({
      category:['',[Validators.required]],
      basicWage:['',[Validators.required,Validators.pattern('[0-9]*')]],
      vectorImage:['',[Validators.required]]
    })
  }

  get formControls(){
    return this.addCategoryForm.controls
  }

  onFileSelected(event:Event){
    const inputElement=event.target as HTMLInputElement
    if (inputElement) {
      this.selectedFiles=inputElement.files[0]
    }
    else{
      this.selectedFiles=null
    }
  }

  onSubmit(){
    if (this.addCategoryForm.valid) {
      const formData:i_category={
        name:this.addCategoryForm.get('category')?.value,
        basicWage:this.addCategoryForm.get('basicWage')?.value,
        vectorImage:this.addCategoryForm.get('vectorImage')?.value
      }

      this.service.addCategory(formData).subscribe((res)=>{

      })
    }

    console.log(this.addCategoryForm.get('vectorImage')?.value,'123456789');
    
    console.log('submitted');
    
    this.isSubmitted=true
  }

}
