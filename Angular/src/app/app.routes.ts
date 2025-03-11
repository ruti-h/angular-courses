import { Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { AuthComponent } from '../components/auth/auth.component';
import { RegisterComponent } from '../components/register/register.component';
import { ShowCoursesComponent } from '../components/show-courses/show-courses.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { EditCourseComponent } from '../components/edit-course/edit-course.component';
import { HomeComponent } from '../components/home/home.component';
import { ShowLessonComponent } from '../components/show-course/show-lesson.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { EditLessonComponent } from '../components/edit-lesson/edit-lesson.component';

export const routes: Routes = [{ path: '', component: AuthComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'show-lesson/:id', component: ShowLessonComponent },
{ path: 'add-lesson/:id', component: AddLessonComponent },
{path:'edit-lesson/:courseId:/LessonId',component:EditLessonComponent},
{ path: 'edit-course/:id', component: EditCourseComponent },
{
    path: 'home', component: HomeComponent, children: [
        { path: 'add-course', component: AddCourseComponent },
        { path: 'courses', component: ShowCoursesComponent }
    ]
}
]

