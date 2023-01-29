import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('newInfoTable') table!: ElementRef;

  ID: number = 0;

  isDisabled = true;

  buttonText = 'Update User Info';

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
    this._traderList.traderListSubject.subscribe((traders) => {
      let receivedTrader = traders.find((t) => t.id === Number(id));
      if (receivedTrader) {
        this.trader = receivedTrader;
        this.ID = Number(id);
      }
    });
  }

  deposit(): void {
    this._dialog.openDepositDialog(this.ID);
  }

  withdraw(): void {
    this._dialog.openWithdrawDialog(this.ID);
  }

  update() {
    this.isDisabled = !this.isDisabled;
    this.buttonText = 'Submit';
  }

  submit() {
    let inputElements = this.table.nativeElement.querySelectorAll('input');
    let newInfo = {
      firstName: inputElements[0].value,
      lastName: inputElements[1].value,
      email: inputElements[2].value,
      dob: inputElements[3].value,
      country: inputElements[4].value,
    };

    this._traderList.updateTrader(this.ID, newInfo);
    DialogService.inform('Success!');
    this.isDisabled = !this.isDisabled;
    this.buttonText = 'Update User Info';
  }

  cancel() {
    this.buttonText = 'Update User Info';
    this.isDisabled = !this.isDisabled;
  }
}
