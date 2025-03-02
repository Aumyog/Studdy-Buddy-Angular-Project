import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { StudyGroupsComponent } from './study-groups/study-groups/study-groups.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { authRedirectGuard } from './guards/auth-redirect.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [authRedirectGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [authRedirectGuard]
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    canActivate: [authRedirectGuard]
  },
  { 
    path: 'study-groups', 
    component: StudyGroupsComponent,
    canActivate: [authGuard]
  },
  { 
    path: '**', 
    redirectTo: 'study-groups' 
  }
];

 
  
  