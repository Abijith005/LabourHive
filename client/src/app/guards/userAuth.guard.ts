import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userDataState } from '../store/user.state';
import { map } from 'rxjs';

export const authLogin: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const store: Store<userDataState> = inject(Store<userDataState>);
  console.log('iam user guard');
  return store.select('user').pipe(
    map((state) => {
      if (state.userDatas?.isLoggedIn) {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    })
  );
};

export const register: CanActivateFn = (route, state) => {
  return true;
};
