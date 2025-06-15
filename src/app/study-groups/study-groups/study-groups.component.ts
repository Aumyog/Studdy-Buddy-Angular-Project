import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { getAuth } from 'firebase/auth';
import { StudyGroupService } from '../../services/study-group.service';
import { StudyGroup } from '../../models/study-group.model';
import { CreateGroupModalComponent } from '../../components/create-group-modal/create-group-modal.component';
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from '../../app.config';
import { DeleteConfirmationModalComponent } from '../../components/delete-confirmation-modal/delete-confirmation-modal.component';


@Component({
  selector: 'app-study-groups',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule,
    CreateGroupModalComponent,
    DeleteConfirmationModalComponent
  ],
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
  showDeleteModal = false;
  groupToDelete: string | null = null;

  constructor(private studyGroupService: StudyGroupService) {}

  async ngOnInit() {
    await this.loadGroups();
  }
  toggleGroupExpansion(groupId: string) {
    this.expandedGroupId = this.expandedGroupId === groupId ? null : groupId;
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
  test(){
    this.showCreateModal = true
    console.log("test")
    console.log(this.showCreateModal)
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
      
      }
    }
  }

 

  initiateDelete(groupId: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.groupToDelete = groupId;
    this.showDeleteModal = true;
  }

  async confirmDelete() {
    if (this.groupToDelete) {
      try {
        await this.studyGroupService.deleteGroup(this.groupToDelete);
        await this.loadGroups();
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    }
    this.showDeleteModal = false;
    this.groupToDelete = null;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.groupToDelete = null;
  }

  isGroupCreator(group: StudyGroup): boolean {
    return this.studyGroupService.isGroupCreator(group);
  }
}
