import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  endpoint: string = 'http://localhost:8011/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

   // Get all users
  GetUsers() {
    return this.http.get(`${this.endpoint}`);
  }
  
     // Delete user
     DeleteUser(id): Observable<any> {
      var API_URL = `${this.endpoint}/delete-user/${id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
     // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}



  