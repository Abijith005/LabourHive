import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { userDataState } from '../store/user.state';

export const guestAuthGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const store: Store<userDataState> = inject(Store<userDataState>);
  console.log('iam guest guard');
  
  return store.select('user').pipe(
    map((state) => {  
      console.log(state,'state');
          
      if (!state.userDatas?.isLoggedIn) {
        console.log('returned true');
        
        return true;
      } else {        
        console.log('returned dfalse');
        
        router.navigate(['']);
        return false;
      }
    })
  );
};
