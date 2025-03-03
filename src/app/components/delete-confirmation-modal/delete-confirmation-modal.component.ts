import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-red-500/20">
        <div class="flex flex-col items-center text-center">
          <!-- Skull Icon -->
          <div class="text-red-500 text-6xl mb-4">
            ☠️
          </div>
          
          <h2 class="text-2xl font-bold text-red-500 mb-2">Delete Study Group?</h2>
          
          <p class="text-gray-300 mb-6">
            This action cannot be undone. All group data will be permanently deleted.
          </p>
          
          <div class="flex gap-4 w-full">
            <button (click)="cancel.emit()"
                    class="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg 
                           hover:bg-gray-600 transition-all">
              Cancel
            </button>
            <button (click)="confirm.emit()"
                    class="flex-1 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg 
                           hover:bg-red-500/30 transition-all font-semibold">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DeleteConfirmationModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
} 