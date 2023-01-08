import { Component, OnInit } from '@angular/core';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  providers: [TraderListService]
})
export class DashboardComponent implements OnInit {

  constructor(private traderListService: TraderListService) { }

  ngOnInit(): void {
  }

}
