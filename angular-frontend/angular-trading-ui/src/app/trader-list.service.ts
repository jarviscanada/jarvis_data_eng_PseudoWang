import { Trader } from './trader';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraderListService {
  constructor() {}

  traderList: Trader[] = [
    {
      key: '1',
      id: 1,
      firstName: 'Mike',
      lastName: 'Spencer',
      dob: new Date().toLocaleDateString(),
      country: 'Canada',
      email: 'mike@email.com',
      amount: 0,
      actions: `<button (click)="deleteTrader">Delete Trader</button>`,
    },
    {
      key: '2',
      id: 2,
      firstName: 'Hellen',
      lastName: 'Miller',
      dob: new Date().toLocaleDateString(),
      country: 'USA',
      email: 'hellen@email.com',
      amount: 0,
      actions: `<button (click)="deleteTrader">Delete Trader</button>`,
    },
  ];

  getDataSource(): Observable<Trader[]> {
    return of(this.traderList);
  }

  getColumns(): string[] {
    return [
      'First Name',
      'Last Name',
      'Email',
      'Date Of Birth',
      'Country',
      'Actions',
    ];
  }

  mapping: { [key: string]: string } = {
    'First Name': 'firstName',
    'Last Name': 'lastName',
    Email: 'email',
    'Date Of Birth': 'dob',
    Country: 'country',
    Actions: 'actions',
  };
}
