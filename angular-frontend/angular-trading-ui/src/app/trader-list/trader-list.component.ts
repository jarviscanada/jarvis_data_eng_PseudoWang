import { Component, ViewChild } from '@angular/core';
import { TraderListService } from '../trader-list.service';
import { DialogService } from '../dialog.service';
import { Trader } from '../trader';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.sass'],
})
export class TraderListComponent {
  @ViewChild(MatTable, { static: true }) traderTable!: MatTable<any>;
  dataSource = new MatTableDataSource<Trader>();
  displayedColumns: string[] = this._traderList.getColumns();

  constructor(private _traderList: TraderListService, private router: Router) {}

  ngOnInit() {
    this._traderList
      .getDataSource()
      .subscribe((data) => (this.dataSource.data = data));
  }

  deleteTrader(id: number): void {
    if (DialogService.confirm('Delete Selected Trader?')) {
      this._traderList.deleteTraderAPI(id);
      this.dataSource.data = this.dataSource.data.filter((d) => d.id !== id);
      this.traderTable.renderRows();
    }
  }

  infoTrader(id: number): void {
    this.router.navigate(['/trader-account', id]);
  }
}
