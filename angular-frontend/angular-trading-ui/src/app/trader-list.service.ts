import { Trader } from './trader';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
      amount: 100,
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
      amount: 50,
      actions: { id: 2 },
    },
  ];
  private traderListSubject = new BehaviorSubject<Trader[]>(this.traderList);

  getDataSource(): Observable<Trader[]> {
    return this.traderListSubject.asObservable();
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
    this.traderListSubject.next(this.traderList);
    return true;
  }

  addTrader(value: any): void {
    // ID will be non-unique, but SQL will solve this problem
    const newID = this.traderList.length + 1;
    const newTrader: Trader = {
      key: newID.toString(),
      id: newID,
      firstName: value.firstName,
      lastName: value.lastName,
      dob: value.dob.toLocaleDateString(),
      country: value.country,
      email: value.email,
      amount: 0,
      actions: { id: newID },
    };
    this.traderList.push(newTrader);
    this.traderListSubject.next(this.traderList);
  }

  getTrader(id: number): Trader | null {
    const index = this.traderList.findIndex((trader) => trader.id === id);
    if (index === -1) return null;
    return this.traderList[index];
  }

  updateAmount(id: number, newAmount: number): boolean {
    const index = this.traderList.findIndex((trader) => trader.id === id);
    if (index === -1) return false;
    this.traderList[index].amount = newAmount;
    this.traderListSubject.next(this.traderList);
    return true;
  }
}
