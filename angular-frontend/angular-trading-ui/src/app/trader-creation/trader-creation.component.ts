import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { FormBuilder } from '@angular/forms';
import { TraderListComponent } from '../trader-list/trader-list.component';

@Component({
  selector: 'app-trader-creation',
  templateUrl: './trader-creation.component.html',
  styleUrls: ['./trader-creation.component.sass'],
  providers: [TraderListComponent],
})
export class TraderCreationComponent {
  // @ViewChild(MatTable, { static: true }) traderTable!: MatTable<any>;

  traderForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    dob: '',
  });

  constructor(
    private _dialog: DialogService,
    private formBuilder: FormBuilder,
    private traderList: TraderListComponent
  ) {}

  submit(): void {
    this.traderList.addTrader(this.traderForm.value);
    this._dialog.closeDialog();
  }

  cancel(): void {
    this._dialog.closeDialog();
  }
}
