import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }
  private apiUrl="http://localhost:3000/api/courses"
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}` // הוספת טוקן אם נדרש
    });
  }

  // שליפת כל השיעורים של קורס מסוים
  getLessonsByCourse(courseId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers: this.getAuthHeaders() });
  }

  // שליפת שיעור לפי ID
  getLessonById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/lessons`, { headers: this.getAuthHeaders() });
  }

  // יצירת שיעור חדש
  createLesson(courseId: string, title: string, content: string): Observable<any> {
    const body = { title, content,courseId };
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, body, { headers: this.getAuthHeaders() });
  }

  // עדכון שיעור לפי ID
  updateLesson(id: string, updates: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/lessons`, updates, { headers: this.getAuthHeaders() });
  }

  // מחיקת שיעור לפי ID
  deleteLesson(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/lessons`, { headers: this.getAuthHeaders() });
  }
}



