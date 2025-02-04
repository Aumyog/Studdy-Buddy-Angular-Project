import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class HomeComponent {
  features = [
    {
      title: 'Find Study Groups',
      description: 'Connect with students in your program and courses. Form study groups and collaborate effectively.',
      icon: '👥'
    },
    {
      title: 'Share Resources',
      description: 'Exchange study materials, notes, and helpful resources with your peers.',
      icon: '📚'
    },
    {
      title: 'Real-time Discussions',
      description: 'Engage in course-specific discussions and get help from your peers instantly.',
      icon: '💬'
    },
    {
      title: 'Track Progress',
      description: 'Monitor your study goals and achievements with our tracking tools.',
      icon: '📈'
    }
  ];

  stats = [
    { number: '500+', label: 'Active Study Groups' },
    { number: '1000+', label: 'UW Students' },
    { number: '50+', label: 'Programs Covered' }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      content: 'StuddyBuddy helped me connect with other CS students. Our study group improved my coding skills significantly!',
      avatar: 'assets/avatar1.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Engineering Student',
      content: 'The platform made it easy to find study partners for difficult subjects. Highly recommended!',
      avatar: 'assets/avatar2.jpg'
    }
  ];
}
