
import { Component, OnInit } from '@angular/core';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { Store } from '@ngrx/store';
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

  userDatas: i_UserDetails[] | null = null
  keyWord: string = ''

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(res => {
      this.userDatas = res;
      this.store.dispatch(getAllusers({ userDatas: res }))
    })
  }

  blockStatus(id: string, status: boolean) {
    this.service.blockStatus(id, status).subscribe(res => {
      if (res.success) {
        this.store.dispatch(blockUser({_id:id}))
        this.store.select('adminData').subscribe(state => {
          this.userDatas = state.datas;
          const title = 'Success!!'
          const message = res.message
          const layoutType = DialogLayoutDisplay.SUCCESS
          this.helper.showToaster(title, message, layoutType)

        });
      }

      else {
        const title = 'Faiiled!!'
        const message = res.message
        const layoutType = DialogLayoutDisplay.DANGER
        this.helper.showToaster(title, message, layoutType)
      }
    })




  }

  searchUser() {

    this.store.select('adminData').subscribe(state => {
      this.userDatas = state.datas?.filter(user => user.name.includes(this.keyWord) || user.email.includes(this.keyWord)) || null;

    });

  }
}

