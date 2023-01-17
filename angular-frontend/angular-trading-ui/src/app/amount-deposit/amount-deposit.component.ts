import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-amount-deposit',
  templateUrl: './amount-deposit.component.html',
  styleUrls: ['./amount-deposit.component.sass'],
})
export class AmountDepositComponent {
  id: number = 0;
  amount: number = 0;

  constructor(private _traderList: TraderListService, private _dialog: DialogService) {}

  deposit(): boolean {
    if (this.amount <= 0) {
      DialogService.inform('Amount Incorrect!');
      return false;
    }
    let trader = this._traderList.getTrader(this.id);
    if (trader)
      if (this._traderList.updateAmount(this.id, trader.amount + this.amount)) {
        DialogService.inform('Success!');
        this._dialog.closeDialog();
        return true;
      }

    DialogService.inform('Deposit Failed!');
    return false;
  }
}
