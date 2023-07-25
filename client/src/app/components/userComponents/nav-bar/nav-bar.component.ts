import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { i_UserDetails } from 'src/app/interfaces/userInterfaces/i_user-details';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { AuthState } from 'src/app/store/user.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userLoggedIn: boolean = false
  userInformations$:Observable<i_UserDetails>|null=null;

  constructor(private service: UserService,
    private helper: HelperService,
    private store:Store<AuthState>
  ) { }

  ngOnInit(): void {
   
    const token = localStorage.getItem('userLoggedIn')
    if (token) {

      this.userLoggedIn = true
    }
    else {
      this.userLoggedIn = false
    }

    // this.store.select('auth').subscribe(state=>{      
      
    //   this.userInformations=state?.userDatas
      
    // })

    this.userInformations$=this.store.select('auth').pipe(
      map((state)=>{
        return state.userDatas!
      })
    )

  

  }


  logout() {

    this.service.userLogout().subscribe(res => {
      if (res.success) {
        localStorage.removeItem('userLoggedIn')
        this.userLoggedIn = false
        // toaster message
        const message = res.message
        this.helper.showToaster(message,res.success)
      }
    })

  }

}
