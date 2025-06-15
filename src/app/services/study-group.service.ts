import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { StudyGroup } from '../models/study-group.model';
import { db } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class StudyGroupService {
 

  // Get user's study groups
  async getUserGroups(): Promise<StudyGroup[]> {
    const auth = getAuth();
    const userEmail = auth.currentUser?.email;
    const q = query(
      collection(db, 'studyGroups'),
      where('members', 'array-contains', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudyGroup));
  }

  // Get all available study groups
  async getAllGroups(): Promise<StudyGroup[]> {
    const querySnapshot = await getDocs(collection(db, 'studyGroups'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudyGroup));
  }

  private generateGroupCode(): string {
    // Generate a 6-character alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  // Create new study group
  async createGroup(group: Omit<StudyGroup, 'id' | 'createdAt' | 'members' | 'code'>): Promise<string> {
    const auth = getAuth();
    const userEmail = auth.currentUser?.email;
    const newGroup = {
      ...group,
      code: this.generateGroupCode(),
      createdBy: userEmail,
      createdAt: new Date(),
      members: [userEmail]
    };
    const docRef = await addDoc(collection(db, 'studyGroups'), newGroup);
    return docRef.id;
  }

  // Join a study group
  async joinGroup(groupId: string): Promise<void> {
    const auth = getAuth();
    const userEmail = auth.currentUser?.email;
    const groupRef = doc( db, 'studyGroups', groupId);
    await updateDoc(groupRef, {
      members: [...(await this.getGroupMembers(groupId)), userEmail]
    });
  }

  private async getGroupMembers(groupId: string): Promise<string[]> {
    const groupDoc = await getDoc(doc(db, 'studyGroups', groupId));
    return groupDoc.data()?.['members'] || [];
  }

  async deleteGroup(groupId: string): Promise<void> {
    const auth = getAuth();
    const userEmail = auth.currentUser?.email;
    
    // Get the group to check if the user is the creator
    const groupDoc = await getDoc(doc(db, 'studyGroups', groupId));
    const groupData = groupDoc.data();
    
    if (groupData?.['createdBy'] !== userEmail) {
      throw new Error('Only the creator can delete the group');
    }
    
    await deleteDoc(doc(db, 'studyGroups', groupId));
  }

// function to upload files to the group. 
  async filesUpload(groupId: string, files: File[]): Promise<void> {
    const auth = getAuth();
    const userEmail = auth.currentUser?.email;
    const groupRef = doc(db, 'studyGroups', groupId);
    await updateDoc(groupRef, {
      files: files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadedBy: userEmail,
        uploadedAt: new Date()
      }))
    });
  }

  isGroupCreator(group: StudyGroup): boolean {
    const auth = getAuth();
    return group.createdBy === auth.currentUser?.email;
  }
}
