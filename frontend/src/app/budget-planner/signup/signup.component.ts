import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  signUp(): void {
    // Display the popup
    this.snackBar.open('Successfully signed up', 'Close', {
      duration: 3000,
    });

    // Navigate to the login page after a delay
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
