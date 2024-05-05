import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  onLogout(): void {
    this.snackBar
      .open('You have been successfully logged out', 'Close', {
        duration: 10000,
        panelClass: ['snackbar-success'],
      })
      .afterDismissed()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
