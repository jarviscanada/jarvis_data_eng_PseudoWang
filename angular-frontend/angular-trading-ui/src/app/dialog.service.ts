import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraderCreationComponent } from './trader-creation/trader-creation.component';
import { AmountDepositComponent } from './amount-deposit/amount-deposit.component';
import { AmountWithdrawComponent } from './amount-withdraw/amount-withdraw.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  static confirm(message?: string) {
    const confirmation = window.confirm(message || 'Is It OK?');
    return confirmation;
  }

  static inform(message?: string) {
    const information = window.alert(message || 'Notice!');
    return information;
  }

  dialogID!: string;

  openDialog() {
    const dialogRef = this.dialog.open(TraderCreationComponent);
    this.dialogID = dialogRef.id;
  }

  closeDialog() {
    const dialogRef = this.dialog.getDialogById(this.dialogID);
    if (dialogRef) dialogRef.close();
  }

  openDepositDialog(id: number) {
    const dialogRef = this.dialog.open(AmountDepositComponent);
    dialogRef.componentInstance.id = id;
    this.dialogID = dialogRef.id;
  }

  openWithdrawDialog(id: number) {
    const dialogRef = this.dialog.open(AmountWithdrawComponent);
    dialogRef.componentInstance.id = id;
    this.dialogID = dialogRef.id;
  }
}
