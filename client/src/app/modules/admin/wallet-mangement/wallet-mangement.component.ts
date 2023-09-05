import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Subject, takeUntil } from 'rxjs';
import { AdminWalletManagementService } from 'src/app/services/adminServices/admin-wallet-management.service';

@Component({
  selector: 'labourHive-wallet-mangement',
  templateUrl: './wallet-mangement.component.html',
  styleUrls: ['./wallet-mangement.component.css'],
})
export class WalletMangementComponent implements OnInit, OnDestroy {
  // variable declarations
  walletDetails: any = null;

  private _unsubscibe$ = new Subject<void>();

  constructor(private _walletManagement: AdminWalletManagementService) {}

  ngOnInit(): void {
    this._walletManagement
      .getWalletDetails()
      .pipe(takeUntil(this._unsubscibe$))
      .subscribe((res) => {
        console.log(res);
        
        this.walletDetails = res;
      });
  }

  ngOnDestroy(): void {}
}
