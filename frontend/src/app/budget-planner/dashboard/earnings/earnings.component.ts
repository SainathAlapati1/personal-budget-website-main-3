// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
// import { DataService } from '../../../data.service';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Earnings } from './Earnings';

// @Component({
//   selector: 'app-add-earnings',
//   templateUrl: './add-earnings.component.html',
//   styleUrl: './add-earnings.component.scss'
// })
// export class AddEarningsComponent {

//   //amount = new FormControl();
//   months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//   addEarnings!: FormGroup;
//   earnings!: Earnings[];
//   newEarnings!: Earnings;
//   //amount!: new FormControl();

//   constructor(
//     public dialogRef: MatDialogRef<AddEarningsComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private dataService : DataService,
//     private formBuilder: FormBuilder
//   ) {

//     this.addEarnings = this.formBuilder.group({
//       months: ['', Validators.required],
//       amount: ['', Validators.required]
//     })
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   ngOnInit(): void {
//     this.getEarningsData();
//   }

//   getEarningsData() {
//     this.dataService.getEarningsData()
//       .subscribe((earnings) => { this.earnings = earnings;}
//       ,error => { console.log("error : " + error)});
//   }

//   onSubmit(){
//     console.log("data is: " + this.addEarnings.value);
//     this.dataService.insertEarningsData(this.addEarnings.value)
//       .subscribe(response => {
//         //this.getAllocatedBudgetItems();
//         console.log(" Earnings data added successfully");
//         console.log("response is : " + response);
//       }
//       ,error => { console.log("Error: " + error)});

//   }
//   addEarningsData() {
//     console.log("reached addItem() " + this.newEarnings + " Form val: " + this.addEarnings.value + " this.earnings: " + this.earnings);
//     this.dataService.insertEarningsData(this.addEarnings.value)
//       .subscribe(response => {
//         this.getEarningsData();
//         console.log("response is : " + response);
//       }
//       ,error => { console.log("Error: " + error)});
//   }

//   updateEarningsData() {

//     this.dataService.updateEarningsData(this.newEarnings)
//       .subscribe(response => this.getEarningsData()
//       ,error => { console.log("Error: " + error)});
//   }

//   deleteEarnings(itemName: any) {

//   this.dataService.deleteAllocatedBudgetItem(itemName)
//       .subscribe(response => this.getEarningsData()
//       ,error => { console.log("Error: " + error)});
//   }

//   deleteItemI() {
//     this.dataService.deleteAllocatedBudgetItem(this.newEarnings)
//         .subscribe(response => this.getEarningsData()
//         ,error => { console.log("Error: " + error)});
//     }

// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../../data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Earnings } from './Earnings';
import { AuthenticationService } from '../../authentication.service';
@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.scss',
})
export class EarningsComponent {
  //amount = new FormControl();
  months = [
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
  years = [
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030',
    '2031',
    '2032',
    '2033',
    '2034',
    '2035',
  ];
  addEarnings!: FormGroup;
  earnings!: Earnings[];
  newEarnings!: Earnings;
  loggedInUser!: string;
  //amount!: new FormControl();

  constructor(
    public dialogRef: MatDialogRef<EarningsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.addEarnings = this.formBuilder.group({
      months: ['', Validators.required],
      years: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUserId();
    this.getEarningsData();
  }

  getEarningsData() {
    this.dataService.getEarningsData(this.loggedInUser).subscribe(
      (earnings) => {
        this.earnings = earnings;
      },
      (error) => {
        console.log('error : ' + error);
      }
    );
  }

  onSubmit() {
    console.log('data is: ' + this.addEarnings.value);
    this.dataService.insertEarningsData(this.loggedInUser, this.addEarnings.value).subscribe(
      (response) => {
        //this.getAllocatedBudgetItems();
        console.log(' Earnings data added successfully');
        console.log('response is : ' + response);
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }
  addEarningsData() {
    console.log(
      'reached addItem() ' +
        this.newEarnings +
        ' Form val: ' +
        this.addEarnings.value +
        ' this.earnings: ' +
        this.earnings
    );
    this.dataService.insertEarningsData(this.loggedInUser, this.addEarnings.value).subscribe(
      (response) => {
        this.getEarningsData();
        console.log('response is : ' + response);
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  updateEarningsData() {
    this.dataService.updateEarningsData(this.loggedInUser, this.newEarnings).subscribe(
      (response) => this.getEarningsData(),
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  deleteEarnings(itemName: any) {
    this.dataService.deleteEarningsData(this.loggedInUser, itemName).subscribe(
      (response) => this.getEarningsData(),
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  deleteItemI() {
    this.dataService.deleteEarningsData(this.loggedInUser, this.newEarnings).subscribe(
      (response) => this.getEarningsData(),
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }
}
