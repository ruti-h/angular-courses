import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
//import { ShowCourseComponent } from '../components/show-course/show-course.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'final-project';
}
