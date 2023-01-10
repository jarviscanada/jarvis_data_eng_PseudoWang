import { Component } from '@angular/core';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.sass'],
  providers: [TraderListService],
})
export class TraderListComponent {
  constructor(private _traderList: TraderListService) {}

  //_traderList: TraderListService = new TraderListService();
  displayedColumns: string[] = this._traderList.getColumns();
  dataSource = this._traderList.getDataSource();

  deleteTrader(event: Event, id: number): void {
    try {
      this._traderList.deleteTrader(id);
    } catch (err) {
      console.log(err);
    }
  }
}
