
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Lesson } from '../../models/lesson';
import { ShowCoursesComponent } from '../show-courses/show-courses.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Course } from '../../models/course';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LessonsService } from '../../service/lesson.service';
@Component({
  selector: 'app-show-lesson',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatDividerModule],
  templateUrl: './show-lesson.component.html',
  styleUrl: './show-lesson.component.css'
})

export class ShowLessonComponent {
  lessons: Lesson[] = []; // מערך המשתמשים
  token: string | any = sessionStorage.getItem("token")
  role: string | any = sessionStorage.getItem('role')
  courseId: any;
  courseData: any;
  constructor(private lessonService: LessonsService, private http: HttpClient, private router: Router, private rote: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.courseId = this.rote.snapshot.paramMap.get('id');
    console.log("courseId:" + this.courseId)
    this.courseData = sessionStorage.getItem('id');
  }
  ngOnInit() {
    this.lessonService.getLessonsByCourse(this.courseId).subscribe(
      (data) => {
        console.log("lesons:"+data)
        this.lessons = data; // שמירת המידע במערך
      },
      (error) => {
        console.error('Error fetching users', error); // טיפול בשגיאות
      }
    );
  }
  delete(lessonId: number | undefined) {
    const courseId: number = this.courseData.id
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    // ודא שהכתובת נכונה
    this.http.delete(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`, { headers })
      .subscribe(
        (response) => {
          console.log('Lesson deleted successfully', response);
          // עדכון המערך לאחר מחיקת השיעור
          this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
        },
        (error) => {
          console.error('Error deleting lesson', error); // טיפול בשגיאות
        }
      );
    }
  editLesson(id: number) {
    this.courseId
    this.router.navigate(['/edit-lesson', this.courseId,id]);
  }
  AddLesson() {
    this.router.navigate(['/add-lesson',this.courseId]);
  }
}