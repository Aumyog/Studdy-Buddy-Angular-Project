import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WaterlooApiService } from '../../services/waterloo-api.service';
import { debounceTime, distinctUntilChanged, switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-create-group-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [WaterlooApiService],
  templateUrl: './create-group-modal.html'
})
export class CreateGroupModalComponent implements OnInit {
  @Output() create = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  groupData = {
    name: '',
    course: '',
    courseName: '',
    description: '',
    location: 'remote',
    capacity: 5
  };

  subjects: any[] = [];
  selectedSubject: string = '';
  courses: any[] = [];
  locations: any[] = [];


  constructor(private waterlooApi: WaterlooApiService) {}

  ngOnInit() {
    this.loadSubjects();
    this.loadLocations();
  }
  async loadLocations() {
    try {
      const response = await this.waterlooApi.getLocations().toPromise();
      if (response && Array.isArray(response)) {
        const apiLocations = response.map(loc => ({
          code: loc.buildingCode || loc.code,
          name: loc.buildingName || loc.name
        }));
        
        this.locations = [...this.locations, ...apiLocations]
          .filter((loc, index, self) => 
            index === self.findIndex((t) => t.code === loc.code)
          );
      }
    } catch (error) {
      console.error('Error loading locations:', error);
      
    }
  }

  
  loadSubjects() {
    this.waterlooApi.getSubjects().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.subjects = response.map(subject => ({
            code: subject.code,
            name: subject.name
          }));
        }
      },
      error => {
        console.error('Error loading subjects:', error);
        this.subjects = [];
      }
    );
  }

  onSubjectChange() {
    this.groupData.courseName = this.selectedSubject;
    if (this.selectedSubject) {
      this.loadCourses(this.selectedSubject);
    } else {
      this.courses = [];
    }
  }

  loadCourses(subject: string) {
    const response = this.waterlooApi.searchCourses('1239', this.selectedSubject).subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.courses = response.map(course => ({
            code: `${course.catalogNumber}`,
            name: course.title
          }));
        }
      },
      error => {
        console.error('Error loading courses:', error);
        this.courses = [];
      }
    
    )
   
  }

  selectCourse(course: any) {
    this.groupData.courseName = course.code;
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log(this.groupData);
      this.create.emit(this.groupData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
} 