import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { adminLogOut } from 'src/app/store/admin.actions';

@Component({
  selector: 'labourHive-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css'],
})
export class AdminNavBarComponent {
  constructor(private _store: Store,
    private _router:Router) {}
  // variable decalration
  showSideBar = false;
  activeItem: string = 'home';

  //changing items in side bar (for css class activation)
  changeActive(item: string) {
    this.activeItem = item;
  }
  //to open side bar (for css class activation)
  openSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  logOut() {
    this._store.dispatch(adminLogOut({ isLoggedIn: false }));
    localStorage.removeItem('adminToken')
    this._router.navigate(['/adminLogin'])
    
  }
}
