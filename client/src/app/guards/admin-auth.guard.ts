import { Injector, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HelperService } from '../services/commonServices/helper.service';
import { map } from 'rxjs';
import { adminDataState } from '../store/admin.state';

export const adminAuthGuard: CanActivateFn = (route, state) => {  
  const router: Router = inject(Router);
  const store: Store<adminDataState> = inject(Store<adminDataState>);
  const injector: Injector = inject(Injector);
  const HelperServices=injector.get(HelperService)
  return store.select('adminData').pipe(
    map((state) => {
      if (state.isLoggedIn) {
        return true;
      } else {
        router.navigate(['adminLogin']);
        HelperServices.showToaster('Please Login',false)
        return false;
      }
    })
  );
};
