import { Component, OnInit } from '@angular/core';
import { i_hireDatas } from 'src/app/interfaces/adminInterfaces/i_hirings';
import { AdminHireManagementService } from 'src/app/services/adminServices/admin-hire-management.service';

@Component({
  selector: 'labourHive-hire-management',
  templateUrl: './hire-management.component.html',
  styleUrls: ['./hire-management.component.css']
})
export class HireManagementComponent implements OnInit {
  // variable declarataion
  hireDatas:i_hireDatas[]|[]=[]

  constructor(private  _hireService:AdminHireManagementService){

  }

  ngOnInit(): void {
    this._hireService.getAllHireDetails().subscribe(res=>{
      this.hireDatas=res      
    })
  }

}
