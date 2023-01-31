import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../quote';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.sass'],
})
export class QuotesListComponent {
  quotesData: Observable<Quote[]> = this._quotes.getDataSource();
  displayedColumns: string[] = this._quotes.getColumns();

  constructor(private _quotes: QuotesService) {}
}
