import { Component, OnInit } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { Store } from '@ngrx/store';
import { getAllCategory } from 'src/app/store/admin.actions';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { Observable, map } from 'rxjs';
import { adminDataState } from 'src/app/store/admin.state';
import { HelperService } from 'src/app/services/helper.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'labourHive-category-mangement',
  templateUrl: './category-mangement.component.html',
  styleUrls: ['./category-mangement.component.css']
})
export class CategoryMangementComponent implements OnInit {

  categoryDatas$: Observable<i_categoryResponse[]> | null = null

  constructor(private matDialog: MatDialog,
    private _service: AdminService,
    private _store: Store<adminDataState>,
    private _helper: HelperService,
    private _swalService: SwalService) { }

  ngOnInit(): void {
    this._service.getAllCategories().subscribe(res => {
      this._store.dispatch(getAllCategory({ categories: res.categories! }))
      this.categoryDatas$ = this._store.select('adminData').pipe(map(state => {
        return state.category!
      }))

    })
  }

  //opening modal mat-component 

  openDialogAddCategory() {
    this.matDialog.open(AddCategoryComponent, {
      width: '400px',
      disableClose: true,

    })
  }

//opening modal mat-component 

  openDialogEditCategory(categoryId: string) {
    this.matDialog.open(EditCategoryComponent, {
      width: '400px',
      disableClose: true,
      data: { category_id: categoryId }
    })
  }




  async blockCategory(_id: string, status: boolean, name: string) {
    
    //swal funcion called

    const confirmation = await this._swalService.showConfirmation(`${status ? 'Block Category' : 'Unblock Category'}`, `Are you sure you want to ${status ? 'Block' : 'Unblock'} ${name} ?`)

    if (confirmation) {
      this._service.blockCategory(_id, status).subscribe(res => {
        if (res.success) {
          this._store.dispatch(getAllCategory({ categories: res.categories! }))
        }

        this._helper.showToaster(res.message, res.success)
      })
    }




  }

 async deleteCategory(_id: string, name: string) {

  //swal function called

  const confirmation=await this._swalService.showConfirmation('Delete Category',`Are you sure you want to delete ${name} ?`)

  if (confirmation) {
    this._service.deleteCategory(_id).subscribe(res => {
      if (res.success) {
        this._store.dispatch(getAllCategory({ categories: res.categories! }))
        this._helper.showToaster(res.message, res.success)
      }
    })
  }

  }

}
