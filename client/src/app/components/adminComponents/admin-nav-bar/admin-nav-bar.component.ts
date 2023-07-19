import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {

  sideBar=false
  activeItem:string='home'

  changeActive(item:string){
    this.activeItem=item
  }
  

  openSideBar(){
    this.sideBar=!this.sideBar
  }

}
