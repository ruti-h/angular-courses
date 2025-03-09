import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl:'./home.component.html',
  styleUrl:'./home.component.css'
})
export class HomeComponent{
  userRole: string | null;
  constructor( private router: Router) {
    this.userRole = sessionStorage.getItem('role');
  }
  showCourses() {
    alert(this.userRole)
    this.router.navigate(['/home/courses'])
  }
  addCours(){
    this.router.navigate(['/home/add-course']) 
  }
  home(){
    this.router.navigate([['/home']])
  }
}
