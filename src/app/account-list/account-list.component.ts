import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from './account-service.service';
import { AccountElement} from './account-service.service';

const INITIAL_BLOCK_SIZE = 3;

const ACCOUNT = 'account';
const BALANCE = 'balance';
const ASCENDING = 'asc';
const DESCENDING = 'desc';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})

export class AccountListComponent implements OnInit {

  dataSource: AccountElement[];
  fetchComplete = false;

  accountSortDirection = ASCENDING;
  balanceSortDirection = ASCENDING;

  constructor(private accountService: AccountServiceService) { }

  ngOnInit(): void {
    this.dataSource = this.accountService.fetchData(INITIAL_BLOCK_SIZE);
  }

  onLoadMore(): void {
    this.dataSource = this.accountService.loadData();
    this.fetchComplete = true;
  }

  onSortChange(columnName: string): void {
    if (!!columnName) {
      switch (columnName) {
        case ACCOUNT:
          this.accountSortDirection = this.accountSortDirection === ASCENDING ? DESCENDING : ASCENDING;
          const accountSortObject = { sortColumn: ACCOUNT, sortDirection: this.accountSortDirection};
          const accountBlockSize = !this.fetchComplete ? INITIAL_BLOCK_SIZE : undefined;
          this.dataSource = this.accountService.fetchData(accountBlockSize, accountSortObject);
          break;
        case BALANCE:
          this.balanceSortDirection = this.balanceSortDirection === ASCENDING ? DESCENDING : ASCENDING;
          const balanceSortObject = { sortColumn: BALANCE, sortDirection: this.balanceSortDirection};
          const balanceBlockSize = !this.fetchComplete ? INITIAL_BLOCK_SIZE : undefined;
          this.dataSource = this.accountService.fetchData(balanceBlockSize, balanceSortObject);
          break;
      }
    }
  }
}
