import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trader } from '../trader';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-trader-account',
  templateUrl: './trader-account.component.html',
  styleUrls: ['./trader-account.component.sass'],
})
export class TraderAccountComponent {
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
    private _traderList: TraderListService
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    let receivedTrader = this._traderList.getTrader(Number(id));
    if (receivedTrader) this.trader = receivedTrader;
  }
}
