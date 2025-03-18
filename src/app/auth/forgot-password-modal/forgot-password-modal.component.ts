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



  onCancel() {
    this.close.emit(); // Close the modal
  }
}
