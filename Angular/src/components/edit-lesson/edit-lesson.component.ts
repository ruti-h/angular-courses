import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../service/lesson.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent {
  editLessonForm: FormGroup;
  courseId: number | undefined;
  lessonId: number | undefined
  constructor(private fb: FormBuilder, private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.editLessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required]],
      courseId: ['']
    });
  }

  ngOnInit() {
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('courseId'));
    this.lessonId = Number(this.activatedRoute.snapshot.paramMap.get('LessonId'));
   

    this.lessonsService.getLessonById(this.courseId, this.lessonId).subscribe({
      next: (response) => {
  
        
        this.editLessonForm.patchValue({
          title: response.title,
          content: response.content,
          courseId: this.courseId
        })
      },
      error: (error) => {
        console.error('Error get course with id', this.lessonId);
      }
    });
  }
  onSubmit() {
    if (this.editLessonForm.valid && this.lessonId) {

      // שולחים את הנתונים ל-UserService לרישום
      if (this.courseId)
        this.lessonsService.updateLesson(this.lessonId, this.editLessonForm.value.courseId, this.editLessonForm.value).subscribe({
          next: (response) => {

            this.router.navigate(['home/courses']);

          },
          error: (error) => {
            
            alert('שגיאה בעדכון שיעור');
          }
        });

    }
  }
}
