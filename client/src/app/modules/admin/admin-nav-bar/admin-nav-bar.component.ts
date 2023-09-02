import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'labourHive-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css'],
})
export class AdminNavBarComponent implements OnInit {
  constructor() {}
  // variable decalration
  showSideBar = false;
  activeItem: string = 'home';

  ngOnInit(): void {
    console.log('initialised navabeeeeeeee');
    
  }

  //changing items in side bar (for css class activation)
  changeActive(item: string) {
    this.activeItem = item;
  }
  //to open side bar (for css class activation)
  openSideBar() {
    this.showSideBar = !this.showSideBar;
  }
}
