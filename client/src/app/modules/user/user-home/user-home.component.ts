import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { UserService } from 'src/app/modules/user/userServices/user.service';
@Component({
  selector: 'labourHive-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit,OnDestroy {
  //variable declaration

  categories!: i_categoryResponse[];

  private _unsubscribe$=new Subject<void>()

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.getCategoryDetails().pipe(takeUntil(this._unsubscribe$)).subscribe((res) => {
      this.categories = res.categories!;
      localStorage.setItem('categories', JSON.stringify(this.categories));
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }
}
