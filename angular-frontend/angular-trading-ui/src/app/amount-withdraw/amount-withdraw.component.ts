import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog.service';
import { TraderListService } from '../trader-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-amount-withdraw',
  templateUrl: './amount-withdraw.component.html',
  styleUrls: ['./amount-withdraw.component.sass'],
})
export class AmountWithdrawComponent implements OnInit {
  id: number = 0;
  amount: number = 0;
  private url = 'http://localhost:3001/api/';

  constructor(
    private _traderList: TraderListService,
    private _dialog: DialogService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  withdraw(): void {
    let trader = this._traderList.getTrader(this.id);
    let traderAmount = trader ? trader.amount : -1;

    if (
      this.amount <= 0 ||
      traderAmount === -1 ||
      traderAmount - this.amount < 0
    ) {
      DialogService.inform('Amount Incorrect!');
    }
    this.http
      .post(this.url + `account/withdraw/${this.id}`, { amount: this.amount })
      .subscribe(
        (data: any) => {
          DialogService.inform('Success!');
          this._dialog.closeDialog();
          this._traderList.updateAmount(data.trader_id, data.amount);
        },
        (err) => {
          console.log(err);
          DialogService.inform('Withdraw Failed!');
        }
      );
  }
}
