import { HttpClient } from '@angular/common/http';
import { Trader } from './trader';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraderListService {
  constructor(private http: HttpClient) {
    this.getTradersAPI();
  }

  traderList: Trader[] = [
    {
      key: '1',
      id: 1,
      firstName: 'NonAPI',
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

  private url = 'http://localhost:3001/api/';

  getTradersAPI(): void {
    this.http
      .get<Trader[]>('http://localhost:3001/api/trader')
      .toPromise()
      .then(
        (data) => {
          this.traderList = data;
          this.traderListSubject.next(this.traderList);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  async createTraderAPI(trader: any): Promise<void> {
    const newTrader = {
      firstName: trader.firstName,
      lastName: trader.lastName,
      dob: trader.dob.toLocaleDateString(),
      country: trader.country,
      email: trader.email,
      amount: 0,
    };
    try {
      await this.http
        .post<Trader[]>(this.url + 'trader', newTrader)
        .toPromise();
      this.getTradersAPI();
    } catch (error) {
      console.error(error);
    }
  }

  deleteTraderAPI(id: number): boolean {
    this.http.delete<Trader[]>(this.url + 'trader/' + id).subscribe(
      (data) => {
        console.log(data);
        return true;
      },
      (error) => {
        console.error(error);
        return false;
      }
    );
    return true;
  }

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

  updateTrader(id: number, newInfo: any): void {
    // I'll temporarily ignore data verification for this sample project
    const index = this.traderList.findIndex((trader) => trader.id === id);
    this.traderList[index].firstName = newInfo.firstName;
    this.traderList[index].lastName = newInfo.lastName;
    this.traderList[index].email = newInfo.email;
    this.traderList[index].dob = newInfo.dob;
    this.traderList[index].country = newInfo.country;
    this.traderListSubject.next(this.traderList);
  }

  updateAmount(id: number, newAmount: number): boolean {
    const index = this.traderList.findIndex((trader) => trader.id === id);
    if (index === -1) return false;
    this.traderList[index].amount = newAmount;
    this.traderListSubject.next(this.traderList);
    return true;
  }
}
