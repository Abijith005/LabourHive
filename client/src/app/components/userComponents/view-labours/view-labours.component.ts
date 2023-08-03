import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'labourHive-view-labours',
  templateUrl: './view-labours.component.html',
  styleUrls: ['./view-labours.component.css']
})
export class ViewLaboursComponent implements OnInit,OnDestroy {
  labourDetails: i_jobProfile[] | null = null
  category!: string;
  isLoading = false


  private ngUnSubscribe = new Subject()

  constructor(private service: UserService,
    private _route: ActivatedRoute,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this.category = this._route.snapshot.paramMap.get('category')!
    this.isLoading = true
    this.service.getLabours(this.category).pipe(takeUntil(this.ngUnSubscribe)).subscribe(res => {
      this.labourDetails = res
      this.isLoading = false
    })
  }


  viewJobProfile(labour_id:string){
    console.log(labour_id,'labodfjdshfkj');
    
    this._router.navigate([`/viewJobProfile/${labour_id}`])

  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.unsubscribe()
  }

}
