import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { StudyGroupsComponent } from './study-groups/study-groups/study-groups.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },            // Default route for the Login page
    { path: 'login', component: LoginComponent },       // Login page (optional: you can keep or remove this)
    { path: 'study-groups', component: StudyGroupsComponent }, // Study groups page
  ];