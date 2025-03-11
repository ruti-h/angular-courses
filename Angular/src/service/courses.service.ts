import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  // יצירת קורס חדש
  createCourse(course: { title: string; description: string; teacherId: number }): Observable<any> {
    return this.http.post(this.apiUrl, course, { headers: this.getHeaders() });
  }

  // עדכון קורס קיים
  updateCourse(id: number, course: { title: string; description: string; teacherId: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course, { headers: this.getHeaders() });
  }

  // מחיקת קורס לפי ID
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // קבלת כל הקורסים של המורה
  getCourses(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getUserIdFromToken(): number | null {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // מפענח את ה-Payload של ה-JWT
      return payload.userId || null; // מחזיר את ה-userId אם קיים
    } catch (error) {
      console.error('שגיאה בפענוח הטוקן:', error);
      return null;
    }
  }
  getCourseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  
  enrollStudent(courseId: number, userId: number): Observable<any> {

    return this.http.post(`${this.apiUrl}/${courseId}/enroll`,{userId},{ headers: this.getHeaders() });
   }
 
 
   // הסרת סטודנט מקורס
   unenrollStudent(courseId: number, userId: number): Observable<any> {
 
     return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`,{
       body: { userId },headers: this.getHeaders()});
   }
 
   // שליפת כל הקורסים של סטודנט מסוים
   getStudentCourses(studentId: string):Observable<any>{
     return this.http.get<any>(`${this.apiUrl}/student/${studentId}`,{ headers: this.getHeaders() });
   }
}
