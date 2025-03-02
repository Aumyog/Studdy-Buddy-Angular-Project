import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { StudyGroupService } from '../../services/study-group.service';
import { StudyGroup } from '../../models/study-group.model';
import { CreateGroupModalComponent } from '../../components/create-group-modal/create-group-modal.component';
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../../app.config';
@Component({
  selector: 'app-study-groups',
  standalone: true,
  imports: [CommonModule, FormsModule, CreateGroupModalComponent],
  templateUrl: './study-groups.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class StudyGroupsComponent implements OnInit {
  userGroups: StudyGroup[] = [];
  allGroups: StudyGroup[] = [];
  searchTerm: string = '';
  showCreateModal: boolean = false;
  codeSearch: string = '';
  expandedGroupId: string | null = null;

  constructor(private studyGroupService: StudyGroupService) {}

  async ngOnInit() {
    await this.loadGroups();
  }

  async loadGroups() {
    this.userGroups = await this.studyGroupService.getUserGroups();
    this.allGroups = await this.studyGroupService.getAllGroups();
  }

  get filteredGroups() {
    return this.allGroups.filter(group => 
      (this.codeSearch ? group.code.includes(this.codeSearch.toUpperCase()) :
        (group.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         group.course.toLowerCase().includes(this.searchTerm.toLowerCase())))
    );
  }

  isUserInGroup(group: StudyGroup): boolean {
    const auth = getAuth();
    return group.members.includes(auth.currentUser?.email || '');
  }

  async joinGroup(groupId: string) {
    await this.studyGroupService.joinGroup(groupId);
    await this.loadGroups();
  }

  async createGroup(groupData: any) {
    try {
      await this.studyGroupService.createGroup({
        ...groupData,
        capacity: Number(groupData.capacity)
      });
      this.showCreateModal = false;
      await this.loadGroups(); // Refresh the groups list
    } catch (error) {
      console.error('Error creating group:', error);
      // You might want to add error handling/display here
    }
  
  }

  async deleteGroup(groupId: string) {
    if (confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      try {
        await this.studyGroupService.deleteGroup(groupId);
        await this.loadGroups(); // Refresh the groups list
      } catch (error) {
        console.error('Error deleting group:', error);
        // You might want to add error handling/display here
      }
    }
  }

  isGroupCreator(group: StudyGroup): boolean {
    return this.studyGroupService.isGroupCreator(group);
  }

  toggleGroupExpansion(groupId: string) {
    this.expandedGroupId = this.expandedGroupId === groupId ? null : groupId;
  }
}
