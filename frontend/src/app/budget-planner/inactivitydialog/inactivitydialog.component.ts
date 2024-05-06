import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inactivitydialog',
  templateUrl: './inactivitydialog.component.html',
  styleUrl: './inactivitydialog.component.scss',
})
export class InactivitydialogComponent {
  constructor(public dialogRef: MatDialogRef<InactivitydialogComponent>) {} 
  refresh(): void {
    this.dialogRef.close('refresh');
  }
}
