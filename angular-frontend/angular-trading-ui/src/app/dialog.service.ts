import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraderCreationComponent } from './trader-creation/trader-creation.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}
  static confirm(message?: string) {
    const confirmation = window.confirm(message || 'Is it OK?');
    return confirmation;
  }

  openDialog() {
    const dialogRef = this.dialog.open(TraderCreationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog: ${result}`);
    });
  }
}
