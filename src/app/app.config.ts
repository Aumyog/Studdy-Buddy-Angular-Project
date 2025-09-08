import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {  getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyBSOdy1HvtT0HTbmiSDVR1Xt7-M1YZqmCM",
  authDomain: "studybuddy-298ab.firebaseapp.com",
  projectId: "studybuddy-298ab",
  storageBucket: "studybuddy-298ab.firebasestorage.app",
  messagingSenderId: "1018554649230",
  appId: "1:1018554649230:web:745538fd1d6473f46e97df",
  measurementId: "G-5GZKRFBM5P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db= getFirestore(app);
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // Temporarily disable hydration to fix stability issues
    // provideClientHydration(withEventReplay()),
    provideHttpClient()
  ]
};
