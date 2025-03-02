import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
      case 'auth/invalid-credential':
        this.error = 'Invalid email or password.';
        break;
      default:
        this.error = 'An error occurred during login. Please try again.';
    }
  }
}
