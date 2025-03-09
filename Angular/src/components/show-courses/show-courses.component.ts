import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../service/courses.service';
import { Router, RouterOutlet } from '@angular/router';
import { ShowLessonComponent } from '../show-course/show-lesson.component';

@Component({
  selector: 'app-show-courses',
  standalone:true,

  imports: [RouterOutlet],
  templateUrl:'./show-courses.component.html',
  styleUrl:'./show-courses.component.css'
})
export class ShowCoursesComponent implements OnInit {
  courses: any[] = ['ffffffffffffff'];
  errorMessage: string = '';
  userRole: string | null;
  token: string | null = '';
  constructor(private coursesService: CoursesService, private router: Router) {
    this.userRole = sessionStorage.getItem('role');
    this.token = sessionStorage.getItem('token'); // או sessionStorage

  }

  ngOnInit(): void {
  console.log("fbbfb");
  
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        debugger;
        console.log("coursegfggbbbbbbbbs",data);

        this.courses = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error(error);
      }
    });
  }
  delete(id: number) {
    this.coursesService.deleteCourse(id).subscribe({
      next: (data) => {
        console.log('data' + data);

        this.courses = this.courses.filter(c => c.id != id);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error(error);
      }
    });;
  }
  editCourse(id: number) {
    this.router.navigate(['/edit-course', id]);
  }

  addCourse() {
    this.router.navigate(['/add-course']);

  }
  addLesson(id: number) {
    this.router.navigate(['/add-lesson', id]);

  }
  showLesson(token: any, id: any) {
    console.log("hgfds");
    
    this.router.navigate(['/show-lesson',id]);

  }
}
