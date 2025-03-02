import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const authRedirectGuard = () => {
  const router = inject(Router);
  
  return new Promise((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.navigate(['/study-groups']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}; 