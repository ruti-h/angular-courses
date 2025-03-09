import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../../service/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  editCourseForm: FormGroup;
  id:number|undefined;
  constructor(private fb: FormBuilder , private coursesService: CoursesService, 
      private activatedRoute: ActivatedRoute, private router:Router){
    this.editCourseForm = this.fb.group({
         title: ['', Validators.required],
         description: ['', [Validators.required]], 
         teacherId:['']
       });
  }

  ngOnInit(){
  this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'));
   this.coursesService.getCourseById(this.id).subscribe({
    next: (response) => {   
      console.log('course '+response.title)  ;     
     this.editCourseForm.patchValue({
      title:response.title,
      description:response.description,
      teacherId:response.teacherId
     })
    },
    error: (error) => {
      console.error('Error get course with id', this.id);
    }       
  });
  }
  onSubmit() {
    if (this.editCourseForm.valid && this.id) {
      console.log('editCourseForm valid');

      // שולחים את הנתונים ל-UserService לרישום
      this.coursesService.updateCourse(this.id?this.id:0,this.editCourseForm.value).subscribe({
        next: (response) => {          
          console.log('Course created successfully', response);
          this.router.navigate(['/home/courses']);
        },
        error: (error) => {
          console.error('Error updated course', error);
         
        }       
      });
    
    }
  }
}


