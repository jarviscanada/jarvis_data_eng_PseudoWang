import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { FormBuilder } from '@angular/forms';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-trader-creation',
  templateUrl: './trader-creation.component.html',
  styleUrls: ['./trader-creation.component.sass'],
})
export class TraderCreationComponent {
  traderForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    dob: '',
  });

  constructor(
    private _dialog: DialogService,
    private _traderList: TraderListService,
    private formBuilder: FormBuilder
  ) {}

  submit(): void {
    this._traderList.addTrader(this.traderForm.value);
    this._dialog.closeDialog();
  }

  cancel(): void {
    this._dialog.closeDialog();
  }
}
