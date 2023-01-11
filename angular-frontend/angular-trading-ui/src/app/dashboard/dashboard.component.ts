import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  providers: [DialogService],
})
export class DashboardComponent {
  constructor(private _dialog: DialogService) {}

  openDialog(): void {
    this._dialog.openDialog();
  }
}
