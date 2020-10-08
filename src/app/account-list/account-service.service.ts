import { Injectable } from '@angular/core';


export interface AccountElement {
  name: string;
  balance: number;
  changeAmount: number;
  pctChange: number;
}

const ACCOUNT = 'account';
const BALANCE = 'balance';
const ASCENDING = 'asc';
const DESCENDING = 'desc';

const ACCOUNT_DATA: AccountElement[] = [
  {name: 'IRA - 5200', balance: 5763.36, changeAmount: 8916.69, pctChange: -0.08},
  {name: 'AAA - 1812', balance: 2010926.10, changeAmount: 38881.63, pctChange: 0.21},
  {name: 'AAA - 3810', balance: 10050054.07, changeAmount: 8916.69, pctChange: 0.07},
  {name: 'REG - 2019', balance: 13465679.34, changeAmount: 0.00, pctChange: 0.00},
  {name: 'IRA - 0146', balance: 15884302.39, changeAmount: 7430.83, pctChange: 0.03},
  {name: 'AAA - 0029', balance: 39160334.42, changeAmount: 31435.87, pctChange: -0.07}
];

@Injectable({
  providedIn: 'root'
})

export class AccountServiceService {

  constructor() { }

  loadData(blockSize?: number): AccountElement[] {
    if (blockSize > 0 && blockSize <= ACCOUNT_DATA.length) {
      return ACCOUNT_DATA.slice(0, blockSize);
    } else {
      return ACCOUNT_DATA.slice();
    }
  }

  fetchData(blockSize?: number, sortObject?: any): AccountElement[] {
    const sortColumn = sortObject && !!sortObject.sortColumn ? sortObject.sortColumn : undefined;
    const sortDirection = sortObject && !!sortObject.sortDirection ? sortObject.sortDirection : undefined;

    if (!!sortColumn && !!sortDirection) {
      switch (sortColumn) {
        case ACCOUNT:
          const sortedNameData = ACCOUNT_DATA.sort((a, b) => {
            const name1: number = +a.name.substr(5, 4);
            const name2: number = +b.name.substr(5, 4);
            if (sortDirection === ASCENDING) {
              return name1 - name2;
            } else if (sortDirection === DESCENDING) {
              return name2 - name1;
            }
        });
          return !!blockSize ? sortedNameData.slice(0, blockSize) : sortedNameData.slice();
        case BALANCE:
          const sortedBalanceData = ACCOUNT_DATA.sort((a, b) =>
                sortDirection === ASCENDING ? a.balance - b.balance : b.balance - a.balance);
          return !!blockSize ? sortedBalanceData.slice(0, blockSize) : sortedBalanceData.slice();
      }
    } else {
      return !!blockSize ? ACCOUNT_DATA.slice(0, blockSize) : ACCOUNT_DATA.slice();
    }
  }
}
