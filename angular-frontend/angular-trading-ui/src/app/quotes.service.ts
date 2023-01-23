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

  constructor(private http: HttpClient) {}

  private url = 'https://jarvis-express-trading-app.herokuapp.com/api/';

  getQuotesAPI(): Quote[] {
    let quotes = this.quotesList;
    this.http.get<Quote[]>(this.url + 'quote/dailyList').subscribe(
      (data) => {
        console.log(data);
        return true;
      },
      (error) => {
        console.error(error);
      }
    );
    return quotes;
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
    return of(this.quotesList);
  }
}
