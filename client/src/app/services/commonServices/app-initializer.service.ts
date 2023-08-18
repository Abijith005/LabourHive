import { Injectable } from '@angular/core';
import { UserService } from '../../modules/user/userServices/user.service';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private _service: UserService, private _store: Store) {}

  initializeApp(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
     const subscription= this._service.getUserDatas().subscribe((res) => {        
        if (res.success) {
          this._store.dispatch(login({ userDatas: res }));
        }
        subscription.unsubscribe()
        resolve();
      });
    });
  }}
