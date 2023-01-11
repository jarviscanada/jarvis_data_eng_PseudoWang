import { Trader } from './trader';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraderListService {
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
      actions: { id: 1 },
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
      actions: { id: 2 },
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

  deleteTrader(id: number): boolean {
    const index = this.traderList.findIndex((trader) => trader.id === id);
    if (index === -1) return false;
    this.traderList.splice(index, 1);
    return true;
  }

  addTrader(): boolean {
    throw new Error('Method not implemented.');
  }
}
