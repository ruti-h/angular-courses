
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Lesson } from '../../models/lesson';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
   
    this.courseData = sessionStorage.getItem('id');
  }
  ngOnInit() {
    this.lessonService.getLessonsByCourse(this.courseId).subscribe(
      (data) => {
      
        this.lessons = data; // שמירת המידע במערך
      },
      (error) => {
        console.error('Error fetching users', error); // טיפול בשגיאות
      }
    );
  }
  delete(id: number) {
    if (this.courseId)
      this.lessonService.deleteLesson(id, this.courseId).subscribe({
        next: (data) => {

          this.lessons = this.lessons.filter(l => l.id != id);
        },
        error: (error) => {
          // this.errorMessage = 'Failed to load courses';
          console.error(error);
        }
      });;
  }
  editLesson(id: number) {
   
    
    this.courseId
    
    this.router.navigate(['/edit-lesson', this.courseId,id]);
  }
  AddLesson() {
    this.router.navigate(['/add-lesson',this.courseId]);
  }
  back(){
    this.router.navigate(['/home/courses']);
  }
}