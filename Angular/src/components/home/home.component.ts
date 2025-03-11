import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule],
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
