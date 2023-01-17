import { Injectable } from '@angular/core';
import { Quote } from './quote';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  quotesList: Quote[] = [
    {
      ticker: 'FB',
      lastPrice: 319.48,
      bidPrice: 0,
      bidSize: 0,
      askPrice: 13,
      askSize: 400,
    },
    {
      ticker: 'AAPL',
      lastPrice: 0,
      bidPrice: 0,
      bidSize: 0,
      askPrice: 13,
      askSize: 400,
    },
  ];

  constructor(private _http: HttpClient) {}

  getColumns(): string[] {
    return [
      'Ticker',
      'Last Price',
      'Bid Price',
      'Bid Size',
      'Ask Price',
      'Ask Size',
    ];
  }

  getDataSource(): Observable<Quote[]> {
    return of(this.quotesList);
  }
}
