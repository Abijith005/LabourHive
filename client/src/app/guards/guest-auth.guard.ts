import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { userDataState } from '../store/user.state';


export const guestAuthGuard: CanActivateFn = (route, state) => {  
  const router: Router = inject(Router);
  const store: Store<userDataState> = inject(Store);
 
  return store.select('user').pipe(
    map((state) => {
      if (!state.userDatas?.isLoggedIn) {
        return true;
      } else {
        router.navigate(['']);
       
        return false;
      }
    })
  );
};
