import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';
import { AllocatedBudget } from '../allocated-budget/AllocatedBudget';
import { DataService } from '../../../data.service';
import { AuthenticationService } from '../../authentication.service';
import { Expenditure } from './Expenditure';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrl: './expenditure.component.scss',
  providers: [provideMomentDateAdapter(MY_FORMATS)],
})
export class ExpenditureComponent {
  // date = new FormControl(moment());
  // expenseType = new FormControl();
  // amount = new FormControl();
  expenses = [
    'Pharmacy',
    'Transportation',
    'Grocery',
    'Utility',
    'Rent',
    'Misc',
  ];
  addForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExpenditureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.addForm = this.formBuilder.group({
      // date: new FormControl(moment()),
      // expenseType: new FormControl(),
      // amount: new FormControl()
      date: ['', Validators.required],
      expenseType: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setMonthAndYear(normalizedMonthAndYear: any, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.addForm.get('date')?.value ?? Date();
    console.log(
      ' normalized : ' +
        normalizedMonthAndYear +
        ' normalizedMonthAndYear.month(): ' +
        normalizedMonthAndYear.month() +
        ' normalizedMonthAndYear.year(): ' +
        normalizedMonthAndYear.year()
    );
    //ctrlValue.month(normalizedMonthAndYear.month());
    //ctrlValue.year(normalizedMonthAndYear.year());
    const d: Date = new Date();
    console.log('Date : ' + d);
    d.setMonth(normalizedMonthAndYear.month());
    d.setFullYear(normalizedMonthAndYear.year());
    console.log('D is: ' + d);
    this.addForm.get('date')!.setValue(ctrlValue);
    this.addForm.get('date')!.setValue(d);
    console.log(
      'ctrl val: ' + ctrlValue + ' this. : ' + this.addForm.get('date')
    );
    datepicker.close();
  }

  // Datasource = [{
  //   "labels": '',
  //   "value": ''
  // }]

  // dataSource: Datasource1 = [
  //   {
  //     "labels": '',
  //     "value": ''
  //   }
  // ];
  // newDatasource!: Datasource1;
  // items: Datasource1[] = [];
  newExpenditure!: Expenditure;
  items: Expenditure[] = [];
  newItem: any = {};
  loggedInUser!: string;

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUserId();
    this.getExpenditureItems();
  }

  getExpenditureItems() {
    this.dataService.getExpenditureData(this.loggedInUser).subscribe(
      (items) => {
        this.items = items;
      },
      (error) => {
        console.log('error : ' + error);
      }
    );
  }

  onSubmit() {
    console.log('data is: ' + this.addForm.value);
    this.dataService
      .insertExpenditureItem(this.loggedInUser, this.addForm.value)
      .subscribe(
        (response) => {
          //this.getAllocatedBudgetItems();
          console.log(' AllocatedBudget added successfully');
          console.log('response is : ' + response);
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }
  addItem() {
    // axios.post<any>('http://localhost:3000/allocatedbudget/items/addItem', this.newItem)
    //   .then(response => {
    //     this.newItem = {};
    //     this.getAllocatedBudgetItems();
    //   })
    //   .catch(error => {
    //     console.error('Error adding item:', error);
    //   });
    console.log(
      'reached addItem() ' +
        this.newExpenditure +
        ' Form val: ' +
        this.addForm.value +
        ' this.items: ' +
        this.items
    );
    this.dataService
      .insertExpenditureItem(this.loggedInUser, this.items)
      .subscribe(
        (response) => {
          //this.getExpenditureItems();
          console.log('response is : ' + response);
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }

  updateItem() {
    // axios.put<any>(`http://localhost:3000/allocatedbudget/items/${id}`, updatedItem)
    //   .then(response => {
    //     this.getAllocatedBudgetItems();
    //   })
    //   .catch(error => {
    //     console.error('Error updating item:', error);
    //   });
    this.dataService
      .updateExpenditureItem(this.loggedInUser, this.newExpenditure)
      .subscribe(
        (response) => this.getExpenditureItems(),
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }

  deleteItem(itemName: any) {
    //   axios.delete<any>(`http://localhost:3000/allocatedbudget/items/${id}`)
    //     .then(response => {
    //       this.getAllocatedBudgetItems();
    //     })
    //     .catch(error => {
    //       console.error('Error deleting item:', error);
    //     });
    // }
    this.dataService
      .deleteExpenditureItem(this.loggedInUser, itemName)
      .subscribe(
        (response) => this.getExpenditureItems(),
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }

  deleteItemI() {
    //   axios.delete<any>(`http://localhost:3000/allocatedbudget/items/${id}`)
    //     .then(response => {
    //       this.getAllocatedBudgetItems();
    //     })
    //     .catch(error => {
    //       console.error('Error deleting item:', error);
    //     });
    // }
    this.dataService
      .deleteExpenditureItem(this.loggedInUser, this.newExpenditure)
      .subscribe(
        (response) => this.getExpenditureItems(),
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }
}
