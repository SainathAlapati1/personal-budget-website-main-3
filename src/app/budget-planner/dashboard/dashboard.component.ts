// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { AddEarningsComponent } from './add-earnings/add-earnings.component';
// import { AddExpenditureComponent } from './add-expenditure/add-expenditure.component';
// import { DataService } from '../../data.service';
// import { Earnings } from './add-earnings/Earnings';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss',
// })
// export class DashboardComponent {EarningsComponent);
//   constructor(
//     public router: Router,
//     public dialog: MatDialog,
//     private dataService: DataService
//   ) {}
//   //Earnings
//   lastMonthsEarnings = ['January: $1000', 'February: $1500', 'March: $1200'];
//   lastMonthEarnings: string[] = [];
//   currentMonthEarnings = '$2000';

//   //Expenditure
//   lastMonthsExpenditure = ['January: $800', 'February: $1000', 'March: $1200'];
//   lastMonthExpenditure: string[] = [];
//   currentMonthExpenditure = '$1500';

//   //AllocatedBudget
//   expenditures = [
//     'Pharmasy: $80',
//     'Transportation: $100',
//     'Grocery: $120',
//     'Utility: $50',
//     'Rent: $100',
//     'Misc: $50',
//   ];

//   // //Todo Trans
//   // todoTransactions = [
//   //   { description: 'Pay electricity bill' },
//   //   { description: 'Submit monthly report' },
//   //   { description: 'Buy groceries' },
//   //   { description: 'Call insurance company' },
//   // ];

//   //Total
//   totalCurrentMonthEarnings = 2000;
//   totalCurrentMonthExpenditure = 1500;

//   ngOnInit() {
//     this.getEarningsData();
//     this.getExpenditureData();
//   }

//   ngOnChange() {
//     this.getEarningsData();
//     this.getExpenditureData();
//   }
//   getEarningsData() {
//     this.dataService.getEarningsForThreeMonth().subscribe(
//       (earnings) => {
//         console.log('From dashboard.ts Earnings is : ' + earnings);
//         for (let index = 0; index < earnings.length; index++) {
//           const element = earnings[index];
//           const concatMonExp =
//             earnings[index].month + ': $' + earnings[index].amount;
//           console.log('concatMonExp: ' + concatMonExp);
//           this.lastMonthEarnings.push(concatMonExp);
//           console.log('last month earnings: ' + this.lastMonthEarnings);
//         }
//       },
//       (error) => {
//         console.log('error : ' + error);
//       }
//     );
//   }

//   getExpenditureData() {
//     this.dataService.getAllocatedBudgetData().subscribe(
//       (earnings) => {
//         console.log('From dashboard.ts Earnings is : ' + earnings);
//         for (let index = 0; index < earnings.length; index++) {
//           const element = earnings[index];
//           const concatMonExp =
//             earnings[index].monthAndYear + ': $' + earnings[index].amount;
//           console.log('concatMonExp: ' + concatMonExp);
//           this.lastMonthExpenditure.push(concatMonExp);
//           console.log('last month earnings: ' + this.lastMonthEarnings);
//         }
//       },
//       (error) => {
//         console.log('error : ' + error);
//       }
//     );
//   }
//   onEarnings() {
//     // this.router.navigate(['/allocatedbudget-planner/earnings']);
//     const dialogRef = this.dialog.open(AddEarningsComponent, {
//       data: {},
//     });

//     dialogRef.afterClosed().subscribe((result) => {});
//   }
//   onExpenditure() {
//     const dialogRef = this.dialog.open(AddExpenditureComponent, {
//       data: {},
//     });

//     dialogRef.afterClosed().subscribe((result) => {});
//     // this.router.navigate(['/allocatedbudget-planner/expenditure']);
//   }
//   onTodo() {
//     this.router.navigate(['/allocatedbudget-planner/todo']);
//   }

//   //Calculate Total
//   get currentMonthSavings(): number {
//     return this.totalCurrentMonthEarnings - this.totalCurrentMonthExpenditure;
//   }
// }

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EarningsComponent } from './earnings/earnings.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { DataService } from '../../data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';
import { AllocatedBudgetComponent } from './allocated-budget/allocated-budget.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private dataService: DataService,
    private authService: AuthenticationService,
    private dialogModule: MatDialogModule
  ) {}
  //Earnings
  //lastMonthsEarnings = ['January: $1000', 'February: $1500', 'March: $1200'];
  lastMonthsEarnings: string[] = [];
  currentMonthEarnings = '';

  lastMonthsExpenditure: string[] = [];
  currentMonthExpenditure = '';

  //AllocatedBudget
  lastMonthsAllocatedBudget: string[] = [];
  currentMonthAllocatedBudget = '';
  loggedInUser!: string;

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  // expenditures = [
  //   'Pharmasy: $80',
  //   'Transportation: $100',
  //   'Grocery: $120',
  //   'Utility: $50',
  //   'Rent: $100',
  //   'Misc: $50',
  // ];

  //Todo Trans
  todoTransactions = [
    { description: 'Pay electricity bill' },
    { description: 'Submit monthly report' },
    { description: 'Buy groceries' },
    { description: 'Call insurance company' },
  ];

  //Total
  totalCurrentMonthEarnings = 0;
  totalCurrentMonthExpenditure = 0;
  totalCurrentMonthBudget = 0;
  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUserId();
    if (this.loggedInUser === undefined) {
      this.router.navigate(['/login']);
    } else {
      this.getEarningsData();
      this.getExpenditureData();
      this.getCurrentMonEarningsData();
      this.getCurrentMonthExpenditureData();
      this.getAllocatedBudgetData();
      this.getCurrentMonthAllocatedBudgetData();
    }
  }
  ngOnChange() {
    this.getEarningsData();
    this.getExpenditureData();
  }
  getEarningsData() {
    this.lastMonthsEarnings = [];
    this.dataService.getEarningsForThreeMonths(this.loggedInUser).subscribe(
      (earnings) => {
        console.log('From dashboard.ts Earnings is : ' + earnings);
        for (let index = 0; index < earnings.length; index++) {
          const element = earnings[index];
          const concatMonExp =
            earnings[index].month + ': $' + earnings[index].amount;
          console.log('concatMonExp: ' + concatMonExp);
          this.lastMonthsEarnings.push(concatMonExp);
          console.log('last month earnings: ' + this.lastMonthsEarnings);
        }
      },
      (error) => {
        console.log('error : ' + error);
      }
    );
  }

  getExpenditureData() {
    this.lastMonthsExpenditure = [];
    console.log('Logged in user: ' + this.loggedInUser);
    this.dataService
      .getExpenditureDataForThreeMonths(this.loggedInUser)
      .subscribe(
        (expenditure) => {
          console.log('From dashboard.ts Earnings is : ' + expenditure);
          for (let index = 0; index < expenditure.length; index++) {
            const element = expenditure[index];
            const monthAndYear = expenditure[index].monthAndYear;
            const date = new Date(monthAndYear);
            const monthName = this.months[date.getMonth()];
            const concatMonExp = monthName + ': $' + expenditure[index].amount;
            console.log('concatMonExp: ' + concatMonExp);
            this.lastMonthsExpenditure.push(concatMonExp);
            console.log('last month earnings: ' + this.lastMonthsEarnings);
          }
        },
        (error) => {
          console.log('error : ' + error);
        }
      );
  }

  getCurrentMonEarningsData() {
    this.lastMonthsEarnings = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    this.dataService
      .getEarningsByMonthAndYear(
        this.loggedInUser,
        this.months[currentMonth],
        currentYear
      )
      .subscribe(
        (earnings) => {
          console.log(
            'From dashboard.ts current mon Earnings is : ' + earnings
          );
          this.totalCurrentMonthEarnings = earnings[0].amount;
          this.currentMonthEarnings = '$' + this.totalCurrentMonthEarnings;
        },
        (error) => {
          console.log('error : ' + error);
          return error;
        }
      );
  }

  getCurrentMonthExpenditureData() {
    this.dataService.getCurrentMonthExpenditure(this.loggedInUser).subscribe(
      (expenditure) => {
        console.log(
          'From dashboard.ts current month expenditure: ' +
            expenditure[0].total_expenditure
        );
        this.totalCurrentMonthExpenditure = expenditure[0].total_expenditure;
        this.currentMonthExpenditure = '$' + this.totalCurrentMonthExpenditure;
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }
  getCurrentMonthAllocatedBudgetData() {
    this.dataService
      .getCurrentMonthAllocatedBudget(this.loggedInUser)
      .subscribe(
        (budget) => {
          console.log(
            'From dashboard.ts current month budget: ' + budget[0].total_expense
          );
          this.totalCurrentMonthBudget = budget[0].total_expense;
          this.currentMonthAllocatedBudget = '$' + this.totalCurrentMonthBudget;
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }
  getAllocatedBudgetData() {
    this.lastMonthsAllocatedBudget = [];
    this.dataService
      .getAllocatedBudgetDataForThreeMonths(this.loggedInUser)
      .subscribe(
        (budget) => {
          console.log('From dashboard.ts Income is : ' + budget);
          for (let index = 0; index < budget.length; index++) {
            const element = budget[index];
            const monthAndYear = budget[index].monthAndYear;
            const date = new Date(monthAndYear);
            const monthName = this.months[date.getMonth()];
            const concatMonExp = monthName + ': $' + budget[index].amount;
            console.log('concatMonExp: ' + concatMonExp);
            this.lastMonthsAllocatedBudget.push(concatMonExp);
            console.log('last month income: ' + this.lastMonthsAllocatedBudget);
          }
        },
        (error) => {
          console.log('error : ' + error);
        }
      );
  }
  onEarnings() {
    // this.router.navigate(['/allocatedbudget-planner/earnings']);
    const dialogRef = this.dialog.open(EarningsComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.getEarningsData();
        this.getCurrentMonEarningsData();
      }, 100);
    });
  }
  onExpenditure() {
    const dialogRef = this.dialog.open(ExpenditureComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getExpenditureData();
      this.getCurrentMonthExpenditureData();
    });
    // this.router.navigate(['/allocatedbudget-planner/expenditure']);
  }
  onBudget() {
    const dialogRef = this.dialog.open(AllocatedBudgetComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllocatedBudgetData();
      this.getCurrentMonthAllocatedBudgetData();
    });
    // this.router.navigate(['/budget-planner/expenditure']);
  }
  //Calculate Total
  get currentMonthSavings(): number {
    return this.totalCurrentMonthEarnings - this.totalCurrentMonthExpenditure;
  }
}
