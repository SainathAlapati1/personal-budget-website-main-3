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
import { AllocatedBudget } from './AllocatedBudget';
import { DataService } from '../../../data.service';
import { AuthenticationService } from '../../authentication.service';

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
  selector: 'app-allocated-budget',
  templateUrl: './allocated-budget.component.html',
  styleUrl: './allocated-budget.component.scss',
  providers: [provideMomentDateAdapter(MY_FORMATS)],
})
export class AllocatedBudgetComponent {
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
    public dialogRef: MatDialogRef<AllocatedBudgetComponent>,
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
  newAllocatedBudget!: AllocatedBudget;
  items: AllocatedBudget[] = [];
  newItem: any = {};
  loggedInUser!: string;

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUserId();
    this.getAllocatedBudgetItems();
  }

  getAllocatedBudgetItems() {
    this.dataService.getAllocatedBudgetData(this.loggedInUser).subscribe(
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
      .insertAllocatedBudgetItem(this.loggedInUser, this.addForm.value)
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
    console.log(
      'reached addItem() ' +
        this.newAllocatedBudget +
        ' Form val: ' +
        this.addForm.value +
        ' this.items: ' +
        this.items
    );
    this.dataService
      .insertAllocatedBudgetItem(this.loggedInUser, this.items)
      .subscribe(
        (response) => {
          this.getAllocatedBudgetItems();
          console.log('response is : ' + response);
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
  }
}
