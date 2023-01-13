import { Component, OnInit, ViewChild } from '@angular/core';
import { TraderListService } from '../trader-list.service';
import { DialogService } from '../dialog.service';
import { Trader } from '../trader';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.sass'],
})
export class TraderListComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) traderTable!: MatTable<any>;

  constructor(private _traderList: TraderListService) {}

  ngOnInit() {
    this.updateTrader();
  }

  displayedColumns: string[] = this._traderList.getColumns();
  dataSource: Trader[] = [];

  deleteTrader(id: number): void {
    if (DialogService.confirm('Delete Selected Trader?'))
      this._traderList.deleteTrader(id);
    this.updateTrader();
    this.traderTable.renderRows();
  }

  addTrader(traderValue: any): void {
    this._traderList.addTrader(traderValue);
    DialogService.inform('Success!');
    this.updateTrader();
    try {
      this.traderTable.renderRows();
    } catch (error) {
      console.error("------------------------------");
      console.error(error);
      console.error("------------------------------");
    }
  }

  updateTrader(): void {
    this._traderList
      .getDataSource()
      .subscribe((data: Trader[]) => (this.dataSource = data));
  }
}
