import { Component } from '@angular/core';
import { TraderListService } from '../trader-list.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.sass'],
  providers: [TraderListService, DialogService],
})
export class TraderListComponent {
  constructor(private _traderList: TraderListService) {}

  displayedColumns: string[] = this._traderList.getColumns();
  dataSource = this._traderList.getDataSource();

  deleteTrader(id: number): void {
    if (DialogService.confirm('Delete this trader?'))
      if (this._traderList.deleteTrader(id))
        this.dataSource = this._traderList.getDataSource();
  }
}
