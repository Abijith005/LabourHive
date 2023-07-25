import { Component, OnInit } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { Store } from '@ngrx/store';
import { getAllCategory } from 'src/app/store/admin.actions';
import { i_category } from 'src/app/interfaces/adminInterfaces/i_category';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { Observable, map } from 'rxjs';
import { adminDataState } from 'src/app/store/admin.state';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-category-mangement',
  templateUrl: './category-mangement.component.html',
  styleUrls: ['./category-mangement.component.css']
})
export class CategoryMangementComponent implements OnInit{

  categoryDatas$:Observable<i_categoryResponse[]>|null=null
  userDatas: null = null

  constructor(private matDialog: MatDialog,
    private service:AdminService,
    private store:Store<adminDataState>,
    private helper:HelperService) { }

  ngOnInit(): void {
    this.service.getAllCategories().subscribe(res=>{
      this.store.dispatch(getAllCategory({categories:res.categories!}))
      this.categoryDatas$=this.store.select('adminData').pipe(map(state=>{
        return state.category!
      }))
      
    })    
    
  }


  openDialogAddCategory() {
    this.matDialog.open(AddCategoryComponent, {
      width: '400px',
      disableClose: true,
      
    })
  }

  openDialogEditCategory(categoryId:string){
        
    this.matDialog.open(EditCategoryComponent,{
      width:'400px',
      disableClose:true,
      data:{category_id:categoryId} 
    })
  }




  blockCategory(_id:string,status:boolean) { 

    this.service.blockCategory(_id,status).subscribe(res=>{
      if (res.success) {
        this.store.dispatch(getAllCategory({categories:res.categories!}))
        
      }
      this.helper.showToaster(res.message,res.success)

    })

    

  }

  deleteCategory(_id:string) {

    this.service.deleteCategory(_id).subscribe(res=>{
      if(res.success){
        this.store.dispatch(getAllCategory({categories:res.categories!}))
        this.helper.showToaster(res.message,res.success)
      }
    })
   }

}
