import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WaterlooApiService {
  private headers = new HttpHeaders()
    .set('X-API-KEY', environment.waterlooApiKey);
  constructor(private http: HttpClient) {}
  

  getCourses(term: string): Observable<any> {
    return this.http.get(`${environment.waterlooApiUrl}/v3/Courses/${term}`, 
      { headers: this.headers });
  }

  getLocations(): Observable<any> {
    
    return this.http.get(`${environment.waterlooApiUrl}/v3/Locations`, 
      { headers: this.headers });
  }

  // First get subjects, then get courses for that subject
  getSubjects(): Observable<any> {
    return this.http.get(`${environment.waterlooApiUrl}/v3/Subjects`,
      { headers: this.headers });
  }

  searchCourses(term: string, subject: string): Observable<any> {
    return this.http.get(
      `${environment.waterlooApiUrl}/v3/Courses/${term}/${subject}`,
      { headers: this.headers }
    );
  }
} 