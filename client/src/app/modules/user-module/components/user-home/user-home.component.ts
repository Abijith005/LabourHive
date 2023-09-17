import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { i_categoryResponse } from 'src/app/interfaces/adminInterfaces/i_categoryResponse';
import { UserService } from 'src/app/modules/user-module/userServices/user.service';
@Component({
  selector: 'labourHive-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit, OnDestroy {
  //variable declaration

  categories!: i_categoryResponse[];
  totalPages = 5;
  selectedPage = 1;

  private _unsubscribe$ = new Subject<void>();

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service
      .getAllCategoryDetails()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        localStorage.setItem('categories', JSON.stringify(res.categories));
      });

    this.service
      .getCategoryDetails(this.selectedPage)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.totalPages = res.totalPages;
        this.categories = res.categories!;
      });
  }

  selectPage(pageNumber: number) {
    if (!pageNumber || pageNumber > this.totalPages) {
      return;
    }
    this.selectedPage = pageNumber;
    this.service
      .getCategoryDetails(this.selectedPage)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.categories = res.categories!;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
