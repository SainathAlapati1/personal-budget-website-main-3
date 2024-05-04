import { Component, OnInit } from '@angular/core';
import { Expenditure } from '../dashboard/expenditure/Expenditure';
import { AllocatedBudget } from '../../config-budget/AllocatedBudget';
import { DataService } from '../../data.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prev-history',
  templateUrl: './prev-history.component.html',
  styleUrl: './prev-history.component.scss',
})
export class PrevHistoryComponent {
  budgets: any[] = []; // Initialize with an empty array
  earnings: any[] = []; // Initialize with an empty array

  expenditures: Expenditure[] = [];
  addBudgets: AllocatedBudget[] = [];

  addBudgetFilter!: number;
  expenditureFilter!: number;
  earningsFilter!: number;

  userId!: string;

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
    if (this.userId === undefined) {
      this.router.navigate(['/login']);
    }
    // Fetch budget history
    // this.http.get('/api/budgets').subscribe((data: Object) => {
    //   this.budgets = data as any[];
    // });

    // // Fetch monthly income
    // this.http.get('/api/incomes').subscribe((data: Object) => {
    //   this.incomes = data as any[];
    // });
  }

  // console.log("prev hist : " + this.budgetFilter);

  onExpenditureFilterChange() {
    console.log('Prev hist ts: filterValue' + this.expenditureFilter);
    this.dataService
      .getExpenditureDataForDiffMonths(this.userId, this.expenditureFilter)
      .subscribe(
        (expenditure) => {
          this.expenditures = expenditure;
        },
        (error) => {
          console.log('error : ' + error);
        }
      );
  }

  onEarningsFilterChange() {
    this.dataService
      .getEarningsForDiffMonths(this.userId, this.earningsFilter)
      .subscribe(
        (earning) => {
          this.earnings = earning;
        },
        (error) => {
          console.log('error : ' + error);
        }
      );
  }
  onBudgetFilterChange() {
    this.dataService
      .getAllocatedBudgetDataForMonths(this.userId, this.addBudgetFilter)
      .subscribe(
        (budget) => {
          this.addBudgets = budget;
        },
        (error) => {
          console.log('error : ' + error);
        }
      );
  }
}
