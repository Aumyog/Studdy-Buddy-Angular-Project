import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  standalone: true
})

export class LoginComponent {
  loginForm: FormGroup;
  error: string = ''; // To hold error messages

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password field with validation
    });
  }

  async onSubmit() {
    console.log('Form value:', this.loginForm.value);
    console.log('Form valid:', this.loginForm.valid);
    console.log('Form errors:', this.loginForm.errors);
    
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        this.router.navigate(['/study-groups']);
      } catch (error: any) {
        console.error('Login error:', error);
        this.handleError(error);
      }
    } else {
      // Show which fields are invalid
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          console.log(`${key} is invalid:`, control.errors);
        }
      });
    }
  }

  async signInWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in successful:', result.user);
      this.router.navigate(['/study-groups']);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        this.error = 'No user found with this email.';
        break;
      case 'auth/wrong-password':
        this.error = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        this.error = 'Invalid email address.';
        break;
      case 'auth/user-disabled':
        this.error = 'This user has been disabled.';
        break;
      case 'auth/popup-closed-by-user':
        this.error = 'Sign-in popup was closed before completing.';
        break;
      case 'auth/cancelled-popup-request':
        this.error = 'Another sign-in popup is already open.';
        break;
      case 'auth/popup-blocked':
        this.error = 'Sign-in popup was blocked by the browser.';
        break;
      default:
        this.error = 'An error occurred during sign in. Please try again.';
    }
  }
}
