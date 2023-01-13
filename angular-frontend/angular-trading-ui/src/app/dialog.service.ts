import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraderCreationComponent } from './trader-creation/trader-creation.component';

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
}
