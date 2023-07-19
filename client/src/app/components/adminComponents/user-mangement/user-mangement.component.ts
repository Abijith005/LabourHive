import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.css']
})
export class UserMangementComponent implements OnInit {
  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(res=>{
      console.log(res);
      
    })
  }
}
