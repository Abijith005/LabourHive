import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { i_jobProfile } from 'src/app/interfaces/userInterfaces/i_jobProfile';
import { UserService } from 'src/app/modules/user-module/userServices/user.service';

@Component({
  selector: 'labourHive-view-labours',
  templateUrl: './view-labours.component.html',
  styleUrls: ['./view-labours.component.css']
})
export class ViewLaboursComponent implements OnInit,OnDestroy {
  labourDetails: i_jobProfile[] | null = null
  category!: string;
  isLoading = false


  private _unSubscribe$= new Subject<void>()

  constructor(private service: UserService,
    private _route: ActivatedRoute,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this.category = this._route.snapshot.paramMap.get('category')!
    this.isLoading = true
    this.service.getLabours(this.category).pipe(takeUntil(this._unSubscribe$)).subscribe(res => {
      this.labourDetails = res
      this.isLoading = false
    })
  }


  viewJobProfile(labour_id:string){
    this._router.navigate([`/viewJobProfile/${labour_id}`])

  }

  ngOnDestroy(): void {
    this._unSubscribe$.next();
    this._unSubscribe$.complete();
  }

}
