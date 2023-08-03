
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';
import { AdminService } from 'src/app/services/admin.service';
import { HelperService } from 'src/app/services/helper.service';
import { blockUser, getAllusers } from 'src/app/store/admin.actions';
import { adminDataState } from 'src/app/store/admin.state';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'labourHive-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.css']
})
export class UserMangementComponent implements OnInit {

  constructor(private service: AdminService,
    private _store: Store<adminDataState>,
    private _helper: HelperService,
    private _swalService: SwalService) { }

  userDatas$: Observable<i_UserDetails[]> | null = null
  keyWord: string = ''

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(res => {
      this._store.dispatch(getAllusers({ userDatas: res }))

      this.userDatas$ = this._store.select('adminData').pipe(map((state) => {

        return state.datas!
      }))
    })
  }



  async blockStatus(id: string, status: boolean, name: string) {

    const confirmation = await this._swalService.showConfirmation(`${status ? 'Block User' : 'Unblock User'}`, `Are you sure you want to ${status ? 'Block' : 'Unblock'} ${name} ?`);

    if (confirmation) {
      this.service.blockStatus(id, status).subscribe(res => {
        if (res.success) {
          this._store.dispatch(blockUser({ _id: id }))
          this.userDatas$ = this._store.select('adminData').pipe(map((state) => {
            return state.datas!
          }))
        }

        const message = res.message
        this._helper.showToaster(message, res.success)
      })
    }
  }



  searchUser() {
    this.userDatas$ = this._store.select('adminData').pipe(
      map((state) => {
        return state.datas?.filter((user) =>
          user.name.includes(this.keyWord) || user.email.includes(this.keyWord)
        ) || []
      }))

  }
}

