import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent {
  constructor(private _dialog: DialogService) {}

  openDialog(): void {
    this._dialog.openDialog();
  }

  closeDialog(): void {
    this._dialog.closeDialog();
  }
}
