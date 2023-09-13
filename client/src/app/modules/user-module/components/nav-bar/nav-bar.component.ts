import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';
import { HelperService } from 'src/app/services/commonServices/helper.service';
import { UserService } from 'src/app/modules/user-module/userServices/user.service';
import { logOut} from 'src/app/store/user.actions';
import { userDataState } from 'src/app/store/user.state';

@Component({
  selector: 'labourHive-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  // variable declararions

  userLoggedIn: boolean = false;
  userInformations$: Observable<i_UserDetails> | null = null;

  private _unsubscribe$ = new Subject<void>();


  constructor(
    private _service: UserService,
    private _helper: HelperService,
    private _store: Store<userDataState>
  ) {}

  ngOnInit(): void {
    this.userInformations$ = this._store.select('user').pipe(
      takeUntil(this._unsubscribe$),
      map((state) => {
        return state.userDatas!;
      })
    );
  }

  getProfile(){
    
  }

  logout() {
    this._service
      .userLogout()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          localStorage.removeItem('categories');
          this._store.dispatch(logOut());
          this.userLoggedIn = false;
          // toaster message
          const message = res.message;
          this._helper.showToaster(message, res.success);
        }
      });
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
