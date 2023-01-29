import { Injectable } from '@angular/core';
import { Quote } from './quote';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  quotesList: Quote[] = [
    {
      ticker: 'FB',
      lastPrice: 320,
      bidPrice: 0,
      bidSize: 0,
      askPrice: 300,
      askSize: 400,
    },
    {
      ticker: 'AAPL',
      lastPrice: 600,
      bidPrice: 0,
      bidSize: 0,
      askPrice: 580,
      askSize: 400,
    },
  ];

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3001/api/';

  async getQuotesAPI(): Promise<Quote[]> {
    return await this.http
      .get<Quote[]>(this.url + 'quote/dailyList')
      .toPromise();
  }

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
    return from(this.getQuotesAPI());
  }
}
