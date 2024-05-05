import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private afireAuth: AngularFireAuth) {}
  loggedInUser!: string;
  setloggedInUserId(userId: string) {
    //this.firebaseUserIdSubject.next(userId);
    console.log('auth service set User id: ' + userId);
    this.loggedInUser = userId;
  }

  getLoggedInUserId() {
    return this.loggedInUser;
  }

  signIn(params: SignIn): Observable<any> {
    return from<any>(
      this.afireAuth
        .signInWithEmailAndPassword(params.email, params.password)
        .then((userCredential) => {
          // Get user's token
          const token = userCredential.user?.getIdToken();
          // Return token
          return token;
        })
        .catch((error) => {
          console.error('Error: ' + error.message);
          throw error; // Propagate error to the caller
        })
    );
  }

  recoverPassword(email: string): Observable<any> {
    return from(
      this.afireAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('Reset mail sent successfully');
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            console.error('User not found for email:', email);
          } else {
            console.error('Error sending password reset email:', error);
          }
          throw error; // Propagate error to the caller
        })
    );
  }

  register(params: SignIn): Observable<any> {
    return from(
      this.afireAuth
        .createUserWithEmailAndPassword(params.email, params.password)
        .then((response) => {
          console.log('User registered successfully:', response);
        })
        .catch((error) => {
          console.error('Error registering user:', error);
          throw error; // Propagate error to the caller
        })
    );
  }
  signOut(): Observable<void> {
    return from(
      this.afireAuth
        .signOut()
        .then(() => {
          console.log('User signed out successfully');
        })
        .catch((error) => {
          console.error('Error signing out:', error);
          throw error; // Propagate error to the caller
        })
    );
  }
}

type SignIn = {
  email: string;
  password: string;
};
