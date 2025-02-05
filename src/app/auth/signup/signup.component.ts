import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true
  imports: [NgIf, FormsModule],
})
export class SignupComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Sign Up Data:', form);
      // TODO: Add backend integration for signup
    } else {
      console.log('Form is invalid')
    }
  }
}
