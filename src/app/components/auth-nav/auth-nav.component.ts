import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-black text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <!-- Left: App Logo and Welcome Message -->
        <div class="flex items-center gap-4">
          <div class="bg-yellow-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
            SB
          </div>
          <span class="text-xl text-gray-300">
            Welcome {{ userName }}!
          </span>
        </div>

        <!-- Right: Logout Button -->
        <button
          (click)="logout()"
          class="text-gray-300 hover:text-yellow-500 text-lg transition duration-300 transform hover:scale-110"
        >
          Logout
        </button>
      </div>
      <div class="h-1 bg-yellow-500"></div>
    </nav>
  `
})
export class AuthNavComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const auth = getAuth();
    this.userName = auth.currentUser?.email?.split('@')[0] || 'User';
  }

  async logout() {
    const auth = getAuth();
    try {
      await signOut(auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
} 