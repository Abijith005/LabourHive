import { Component } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-mangement',
  templateUrl: './category-mangement.component.html',
  styleUrls: ['./category-mangement.component.css']
})
export class CategoryMangementComponent {
  userDatas:null=null
  
  constructor(private matDialog:MatDialog){}



  openDialog(){
    this.matDialog.open(AddCategoryComponent,{width:'400px'})
    
  }
  blockStatus(){}

  searchUser(){}

}
