import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Replace this with the actual API endpoint or JSON file path

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      );
  }
  getUserById(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?id=${userId}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      );
  }

  addUser(newUser: any): Observable<any> {
    // Assuming your API supports POST method for adding a new user
    return this.http.post<any>(this.apiUrl, newUser);
  }

  updateUser(updatedUser: any): Observable<any> {
    // Assuming your API supports PUT method for updating an existing user
    return this.http.put<any>(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }

  deleteUser(userId: number): Observable<any> {
    // Assuming your API supports DELETE method for deleting a user by ID
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }
}
