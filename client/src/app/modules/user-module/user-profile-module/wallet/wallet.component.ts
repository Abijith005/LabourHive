import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../userServices/user-profile.service';
import { i_walletDetails } from 'src/app/interfaces/userInterfaces/i_walletDetails';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawComponent } from '../withdraw/withdraw.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  // variable declaration
  walletDetails: i_walletDetails[] | [] = [];
  total: number | null = null;

  constructor(private _userProfileServices: UserProfileService,
    private _matDialog:MatDialog
    ) {}

  ngOnInit(): void {
    this._userProfileServices.getWallet().subscribe((res) => {
      this.walletDetails = res;
      this.total = this.walletDetails[0]?.user_id?.wallet
        ? this.walletDetails[0].user_id.wallet
        : 0;
    });
  }

  withdraw() {
this._matDialog.open(WithdrawComponent,{
  width:'450px ',
  data:this.total,
  disableClose:true
})
  }
}
