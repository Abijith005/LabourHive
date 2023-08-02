import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'labourHive-wallet-mangement',
  templateUrl: './wallet-mangement.component.html',
  styleUrls: ['./wallet-mangement.component.css']
})
export class WalletMangementComponent {

  constructor(private matDialog:MatDialog){}



  openDialog(){
    this.matDialog.open(AddCategoryComponent,{width:'300px'})
  }

}
