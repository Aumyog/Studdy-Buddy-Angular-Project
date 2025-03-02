import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-study-groups',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-yellow-500 mb-8">Your Study Groups</h1>
        
        <!-- Placeholder for study groups -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl">
            <h3 class="text-xl font-semibold text-yellow-500 mb-2">Sample Group</h3>
            <p class="text-gray-300">This is a placeholder for your study groups.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StudyGroupsComponent implements OnInit {
  userEmail: string = '';

  ngOnInit() {
    const auth = getAuth();
    this.userEmail = auth.currentUser?.email || '';
  }
}
