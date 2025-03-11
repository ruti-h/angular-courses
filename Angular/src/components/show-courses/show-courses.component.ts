import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../service/courses.service';
import { Router, RouterOutlet } from '@angular/router';
import { ShowLessonComponent } from '../show-course/show-lesson.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-show-courses',
  standalone:true,

  imports: [RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatCardModule],
  templateUrl:'./show-courses.component.html',
  styleUrl:'./show-courses.component.css'
})
export class ShowCoursesComponent implements OnInit {
  courses: any[] = [];
  studentcourses: any[] = [];
  errorMessage: string = '';
  userRole: string | null;
  token: string | null = '';
  constructor(private coursesService: CoursesService, private router: Router) {
    this.userRole = sessionStorage.getItem('role');
    this.token = sessionStorage.getItem('token'); // או sessionStorage

  }

  ngOnInit(): void {
  
    this.coursesService.getCourses().subscribe({
      next: (data) => {
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
 
    this.router.navigate(['/show-lesson',id]);

  }
  loadCoursesByStudent(): void {
    const studentId = sessionStorage.getItem('userId');
 
    
    if (studentId) {
      this.coursesService.getStudentCourses(studentId).subscribe({
        next: (data) => {
          this.studentcourses = data;  
        },
        error: (error) => {
          console.error('Error fetching student courses:', error);
        }
      });
    }
  }
  AddPerson(courseId: number) {
    const userId = Number(sessionStorage.getItem('userId'));
    if (!userId) {
    alert('User not logged in.');
      return;
    }
 
    
    

    this.coursesService.enrollStudent(courseId, userId).subscribe({
      next: () => {
        console.log('Student enrolled successfully');
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט
      },
      error: (error) => {
        console.error('Error enrolling in course:', error);
      }
    });
  }
  deletePerson(courseId: number) {
    const userId = Number(sessionStorage.getItem('userId'));
    if (!userId) {
      console.error('User not logged in.');
      return;
    }

    this.coursesService.unenrollStudent(courseId, userId).subscribe({
      next: () => {
        console.log('Student unenrolled successfully');
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט

      },
      error: (error) => {
        console.error('Error unenrolling from course:', error);
      }
    });
  }

  isEnoled(courseId: number): boolean {    
    return this.studentcourses.some(course => course.id === courseId);
  }
}

