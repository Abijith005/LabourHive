import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userDataState } from './store/user.state';
import { login } from './store/user.actions';
import { UserService } from './services/userServices/user.service';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'LabourHiveFrontEnd';

  private _unsubscribe$ = new Subject<void>();
  constructor(
    private _store: Store<userDataState>,
    private _service: UserService
  ) {}

  ngOnInit(): void {
this._store.select('user').pipe(takeUntil(this._unsubscribe$)).subscribe(state=>{
  if (state?.userDatas?.isLoggedIn) {
    this._service
      .getUserDatas()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this._store.dispatch(login({ userDatas: res }));
      });    
  }
})

  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
