import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink,RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,FormsModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UWStudyBuddy';
}
