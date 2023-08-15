import { Injector, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userDataState } from '../store/user.state';
import { map } from 'rxjs';
import { HelperService } from '../services/commonServices/helper.service';

export const userAuth: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const store: Store<userDataState> = inject(Store<userDataState>);
  const injector: Injector = inject(Injector);
  const HelperServices=injector.get(HelperService)
  return store.select('user').pipe(
    map((state) => {
      if (state.userDatas?.isLoggedIn) {
        return true;
      } else {
        router.navigate(['/login']);
        HelperServices.showToaster('Please Login',false)
        return false;
      }
    })
  );
};

export const register: CanActivateFn = (route, state) => {
  return true;
};
