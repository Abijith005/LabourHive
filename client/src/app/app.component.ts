import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userDataState } from './store/user.state';
import { login } from './store/user.actions';
import { UserService } from './modules/user/userServices/user.service';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements  OnDestroy {
  title = 'LabourHiveFrontEnd';

  private _unsubscribe$ = new Subject<void>();
  constructor(
    private _store: Store<userDataState>,
    private _service: UserService
  ) {}

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
