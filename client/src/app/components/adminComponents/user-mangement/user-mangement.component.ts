
import { Component, OnInit } from '@angular/core';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';
import { AdminService } from 'src/app/services/admin.service';
import { HelperService } from 'src/app/services/helper.service';
import { blockUser, getAllusers } from 'src/app/store/admin.actions';
import { adminDataState } from 'src/app/store/admin.state';

@Component({
  selector: 'app-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.css']
})
export class UserMangementComponent implements OnInit {
  constructor(private service: AdminService,
    private store: Store<adminDataState>,
    private helper: HelperService) { }

  userDatas$: Observable<i_UserDetails[]> | null = null
  keyWord: string = ''

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(res => {
      this.store.dispatch(getAllusers({ userDatas: res }))

      this.userDatas$ = this.store.select('adminData').pipe(map((state) => {
        return state.datas!
      }))
    })
  }

  blockStatus(id: string, status: boolean) {
    this.service.blockStatus(id, status).subscribe(res => {
      if (res.success) {
        this.store.dispatch(blockUser({ _id: id }))
        this.userDatas$ = this.store.select('adminData').pipe(map((state) => {
          return state.datas!
        }))
      }

      const message = res.message
      this.helper.showToaster(message, res.success)


    })

  }

  searchUser() {
    console.log(this.keyWord);

    this.userDatas$ = this.store.select('adminData').pipe(
      map((state) => {
        return state.datas?.filter((user) =>
          user.name.includes(this.keyWord) || user.email.includes(this.keyWord)
        ) || []
      }))

  }
}

