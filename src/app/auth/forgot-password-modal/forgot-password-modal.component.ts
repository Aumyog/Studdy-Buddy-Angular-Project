import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

@Component({
  selector: 'app-forgot-password-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent {
  email: string = '';
  @Output() close = new EventEmitter<void>();

  async onSubmit() {
    const auth = getAuth();
    try {
      this.email = this.email.trim(); // Trim any whitespace
      await sendPasswordResetEmail(auth, this.email);
      alert('Password reset email sent! Please check your inbox.');
      this.close.emit(); // Close the modal after sending the email
    } catch (error: any) {
      console.error('Error sending password reset email:', error); // Log the error for debugging
      if (error.code === 'auth/user-not-found') {
        alert('This email is not registered. Please check and try again.');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  }

  onCancel() {
    this.close.emit(); // Close the modal
  }
}
