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
    private store:Store<adminDataState>) { }

  ngOnInit(): void {
    this.service.getAllCategories().subscribe(res=>{
      this.store.dispatch(getAllCategory({categories:res.categories!}))
      this.categoryDatas$=this.store.select('adminData').pipe(map(state=>{
        return state.category!
      }))
      console.log(res);
      
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




  blockStatus() { }

  searchUser() { }

}
