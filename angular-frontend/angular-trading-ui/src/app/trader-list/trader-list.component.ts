import { Component } from '@angular/core';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.sass'],
  providers: [TraderListService],
})
export class TraderListComponent {
  traderListService: TraderListService = new TraderListService();
  displayedColumns: string[] = this.traderListService.getColumns();
  dataSource = this.traderListService.getDataSource();
}
