import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-trader-creation',
  templateUrl: './trader-creation.component.html',
  styleUrls: ['./trader-creation.component.sass'],
})
export class TraderCreationComponent {
  constructor(private _traderList: TraderListService, private _dialog: DialogService) {}

  submit(): boolean {
    if (this._traderList.addTrader()) {
      DialogService.inform("Success!");
      this._dialog.closeDialog();
      return true;
    }
    DialogService.inform("Failed!");
    return false;
  }

  cancel(): void {
    this._dialog.closeDialog();
  }
}
