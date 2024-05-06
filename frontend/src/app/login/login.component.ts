import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { AuthenticationService } from '../budget-planner/authentication.service';
import { InactivitydialogComponent } from '../budget-planner/inactivitydialog/inactivitydialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  loginError: string = ''; // Track login error message

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.myForm.valid) {
      const email = this.myForm.get('email')!.value;
      const password = this.myForm.get('password')!.value;

      this.authService.signIn({ email, password }).subscribe({
        next: async () => {
          // Get the current user and UID after successful login
          const user = firebase.auth().currentUser;
          const firebaseUserId = user ? user.uid : '';
          console.log('firebaseUserId :' + firebaseUserId);
          this.authService.setloggedInUserId(firebaseUserId);
          // Get the user's token and store it in local storage
          if (user) {
            const token = await user.getIdToken();
            localStorage.setItem('token', token);
          }

          // Start the inactivity timer
          this.startInactivityTimer();

          // Navigate to dashboard on successful login
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error(error);
          // Handle specific login errors (e.g., invalid credentials)
          if (
            error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password' ||
            error.code === 'auth/invalid-credential'
          ) {
            this.loginError = 'Incorrect email or password.';
          } else {
            this.loginError = 'An error occurred. Please try again later.';
          }
        },
      });
    } else {
      // If form is invalid, display error message
      this.loginError = 'Please enter valid email and password.';
    }
  }
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
  startInactivityTimer() {
    // Set the inactivity limit to 50 seconds
    const inactivityLimit = 1000 * 1000;

    let timerId = setTimeout(
      () => this.showInactivityDialog(),
      inactivityLimit
    );

    // Reset the timer whenever there's any activity
    window.onmousemove = window.onkeypress = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => this.showInactivityDialog(), inactivityLimit);
    };
  }

  showInactivityDialog() {
    const dialogRef = this.dialog.open(InactivitydialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.startInactivityTimer();
      } else {
        this.logout();
      }
    });
  }

  logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Log the user out
    this.authService.signOut();

    // Navigate back to the login page
    this.router.navigate(['/login']);
  }
}