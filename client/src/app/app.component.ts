import { Component, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { userDataState } from './store/user.state';
import { UserService } from './modules/user-module/userServices/user.service';
import { Subject,  } from 'rxjs';

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
