import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Router, RouterLink } from '@angular/router';
import { auth } from '../../app.config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [NgIf, FormsModule,RouterLink]
})
export class SignupComponent {
  error: string = '';
  loading: boolean = false;
  constructor(private router: Router) {}

  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.error = '';
      
      const { email, password } = form.value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
        this.router.navigate(['/study-groups']);
      } catch (error: any) {
        console.error('Signup error:', error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.error = 'This email is already registered';
            break;
          case 'auth/invalid-email':
            this.error = 'Invalid email address';
            break;
          case 'auth/operation-not-allowed':
            this.error = 'Email/password accounts are not enabled';
            break;
          case 'auth/weak-password':
            this.error = 'Password is too weak';
            break;
          default:
            this.error = 'An error occurred during signup';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
