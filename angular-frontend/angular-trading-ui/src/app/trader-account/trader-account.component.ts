import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trader } from '../trader';
import { TraderListService } from '../trader-list.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-trader-account',
  templateUrl: './trader-account.component.html',
  styleUrls: ['./trader-account.component.sass'],
})
export class TraderAccountComponent {
  ID: number = 0;

  trader: Trader = {
    key: 'Default',
    id: 0,
    firstName: 'Not Available',
    lastName: 'Not Available',
    dob: 'Not Available',
    country: 'Not Available',
    email: 'Not Available',
    amount: 0,
    actions: {},
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private _traderList: TraderListService,
    private _dialog: DialogService
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    let receivedTrader = this._traderList.getTrader(Number(id));

    if (receivedTrader) {
      this.trader = receivedTrader;
      this.ID = Number(id);
    }
  }

  deposit(): void {
    this._dialog.openDepositDialog(this.ID);
  }

  withdraw(): void {
    this._dialog.openWithdrawDialog(this.ID);
  }
}
