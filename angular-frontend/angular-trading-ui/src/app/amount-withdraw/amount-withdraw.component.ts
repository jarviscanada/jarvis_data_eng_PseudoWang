import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog.service';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-amount-withdraw',
  templateUrl: './amount-withdraw.component.html',
  styleUrls: ['./amount-withdraw.component.sass'],
})
export class AmountWithdrawComponent implements OnInit {
  id: number = 0;
  amount: number = 0;

  constructor(
    private _traderList: TraderListService,
    private _dialog: DialogService
  ) {}

  ngOnInit(): void {}

  withdraw(): boolean {
    let trader = this._traderList.getTrader(this.id);
    let traderAmount = trader ? trader.amount : -1;

    if (
      this.amount <= 0 ||
      traderAmount === -1 ||
      traderAmount - this.amount < 0
    ) {
      DialogService.inform('Amount Incorrect!');
      return false;
    }
    if (trader)
      if (this._traderList.updateAmount(this.id, trader.amount - this.amount)) {
        DialogService.inform('Success!');
        this._dialog.closeDialog();
        return true;
      }

    DialogService.inform('Withdraw Failed!');
    return false;
  }
}
