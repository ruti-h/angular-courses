import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../service/lesson.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatIconModule,
      MatSelectModule,
      ReactiveFormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  addLessonForm: FormGroup;
  id: number
  constructor(private fb: FormBuilder, private lessonService: LessonsService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.addLessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required]],
      courseId: ['']
    });
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    alert(this.id);
  }

  onSubmit() {
    if (this.addLessonForm.valid) {
      console.log('addLessonForm valid');

      this.addLessonForm.patchValue({
        courseId: this.id
      })
      
      console.log(this.addLessonForm.value.courseId);
      console.log(this.addLessonForm.value.title);
      console.log(this.addLessonForm.value.content);
      // שולחים את הנתונים ל-UserService לרישום
      // let stringId: string = this.id.toString();
      this.lessonService.createLesson(this.id,
        this.addLessonForm.value.title, this.addLessonForm.value.content
      ).subscribe({
        next: (response) => {
          console.log('Lesson created successfully', response);
          this.router.navigate(['/home']);
          alert('Lesson created successfully');

        },
        error: (error) => {
          console.error('Error creating lesson', error);
          alert('שגיאה בהוספת שיעור');
        }
      });

    }
  }
}
