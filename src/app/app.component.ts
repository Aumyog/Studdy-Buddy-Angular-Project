import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AuthNavComponent, RouterLink],
  template: `
    <app-auth-nav *ngIf="isAuthenticated"></app-auth-nav>
    <nav *ngIf="!isAuthenticated" class="bg-black text-white shadow-md">
      <!-- Your existing nav content -->
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <div class="flex items-center gap-4">
          <div class="bg-yellow-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
            SB
          </div>
          <span class="text-2xl font-bold text-white-500 hover:text-white transition duration-200">
            Study Buddy
          </span>
        </div>
        <div class="flex gap-6">
          <a class="text-gray-300 hover:text-yellow-500 text-lg transition duration-300 transform hover:scale-110"
             [routerLink]="['/']">Home</a>
          <a class="text-gray-300 hover:text-yellow-500 text-lg transition duration-300 transform hover:scale-110"
             [routerLink]="['/login']">Login</a>
          <a class="text-gray-300 hover:text-yellow-500 text-lg transition duration-300 transform hover:scale-110"
             [routerLink]="['/signup']">Sign Up</a>
        </div>
      </div>
      <div class="h-1 bg-yellow-500"></div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.isAuthenticated = !!user;
    });
  }
}
