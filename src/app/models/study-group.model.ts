export interface StudyGroup {
  id?: string;
  code: string;
  name: string;
  description: string;
  course: string;
  location: string;
  createdBy: string; // user's email
  createdAt: Date;
  members: string[]; // array of user emails
  capacity: number;
  courseName: string;
} 