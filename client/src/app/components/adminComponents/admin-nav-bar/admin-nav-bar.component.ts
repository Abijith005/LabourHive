import { Component } from '@angular/core';


@Component({
  selector: 'labourHive-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {

  constructor() { }

  showSideBar = false
  activeItem: string = 'home'

  //changing items in side bar (for css class activation) 
  changeActive(item: string) {
    this.activeItem = item
  }
//to open side bar (for css class activation)
  openSideBar() {
    this.showSideBar = !this.showSideBar
  }

}
