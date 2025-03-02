import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-group-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold text-yellow-500 mb-6">Create Study Group</h2>
        
        <form #createGroupForm="ngForm" (ngSubmit)="onSubmit(createGroupForm)" class="space-y-4">
          <!-- Group Name -->
          <div>
            <label class="block text-gray-300 mb-2">Group Name</label>
            <input type="text" name="name" [(ngModel)]="groupData.name" required
                   class="w-full px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 
                   focus:outline-none focus:ring-2 focus:ring-yellow-500">
          </div>

          <!-- Course/Subject -->
          <div>
            <label class="block text-gray-300 mb-2">Course/Subject</label>
            <input type="text" name="course" [(ngModel)]="groupData.course" required
                   class="w-full px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 
                   focus:outline-none focus:ring-2 focus:ring-yellow-500">
          </div>

          <!-- Location -->
          <div>
            <label class="block text-gray-300 mb-2">Location</label>
            <select name="location" [(ngModel)]="groupData.location" required
                    class="w-full px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option value="remote">Remote</option>
              <option value="dc">DC Library</option>
              <option value="dp">DP Library</option>
              <option value="mc">MC Building</option>
              <option value="slc">SLC</option>
            </select>
          </div>

          <!-- Capacity -->
          <div>
            <label class="block text-gray-300 mb-2">Maximum Members</label>
            <input type="number" name="capacity" [(ngModel)]="groupData.capacity" required min="2" max="20"
                   class="w-full px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 
                   focus:outline-none focus:ring-2 focus:ring-yellow-500">
          </div>

          <!-- Description -->
          <div>
            <label class="block text-gray-300 mb-2">Description</label>
            <textarea name="description" [(ngModel)]="groupData.description" required rows="3"
                      class="w-full px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 
                      focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-4 mt-6">
            <button type="button" (click)="onCancel()"
                    class="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" [disabled]="!createGroupForm.valid"
                    class="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 
                    disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed
                    transition-all">
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CreateGroupModalComponent {
  @Output() create = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  groupData = {
    name: '',
    course: '',
    description: '',
    location: 'remote',
    capacity: 5
  };

  onSubmit(form: any) {
    if (form.valid) {
      this.create.emit(this.groupData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
} 