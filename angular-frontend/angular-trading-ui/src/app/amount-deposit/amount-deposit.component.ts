import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { TraderListService } from '../trader-list.service';
import { HttpClient } from '@angular/common/http';
import { TraderAccountComponent } from '../trader-account/trader-account.component';

@Component({
  selector: 'app-amount-deposit',
  templateUrl: './amount-deposit.component.html',
  styleUrls: ['./amount-deposit.component.sass'],
})
export class AmountDepositComponent {
  id: number = 0;
  amount: number = 0;
  private url = 'http://localhost:3001/api/';

  constructor(
    private _traderList: TraderListService,
    private _dialog: DialogService,
    private http: HttpClient
  ) {}

  deposit(): void {
    if (this.amount <= 0) {
      DialogService.inform('Amount Incorrect!');
    }
    this.http
      .post(this.url + `account/deposit/${this.id}`, { amount: this.amount })
      .subscribe(
        (data: any) => {
          DialogService.inform('Success!');
          this._dialog.closeDialog();
          this._traderList.updateAmount(data.trader_id, data.amount);
        },
        (err) => {
          console.log(err);
          DialogService.inform('Deposit Failed!');
        }
      );
  }
}
