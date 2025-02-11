import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [NgIf, FormsModule, ReactiveFormsModule, RouterLink],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password field with validation
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);
      // Handle login logic here (without Firebase)
    } else {
      console.log('Form is invalid!');
    }
  }
}
