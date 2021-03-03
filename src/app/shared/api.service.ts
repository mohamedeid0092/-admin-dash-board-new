import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { Subject } from "rxjs";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private restaurants: Restaurant[] = [];
  private restaurantsUpdated = new Subject<Restaurant[]>();
  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient,private router: Router) { }

   // Add restaurant
    // Create User
  //   AddRestaurant(name: string, image_path: File){
  //     const postData = new FormData();
  //   postData.append("name", name);
  //   postData.append("image_path", image_path);
  //   this.http
  //   .post<{ message: string; restaurant: Restaurant }>(
  //     `${this.endpoint}/add-restaurant`,
  //     postData
  //   )
  //   .subscribe(responseData => {
  //     const restaurant: Restaurant = {
  //       //id: responseData.post.id,
  //       name: name,
        
  //       image_path: responseData.restaurant.image_path
  //     };
  //     this.restaurants.push(restaurant);
  //     this.restaurantsUpdated.next([...this.restaurants]);
  //     this.router.navigate(["restaurant-list"]);
  //   });
  
  // }
  AddRestaurant(name: string, image_path: File,restaurant_features:[]): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", name);
    formData.append("image_path", image_path);
    formData.append("restaurant_features", restaurant_features);
    return this.http.post<Restaurant>(`${this.endpoint}/add-restaurant`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
  //  AddRestaurant(data: Restaurant): Observable<any> {
  //   //const formData: FormData = new FormData();
  //   let API_URL = `${this.endpoint}/add-restaurant`;
  //   //   const postData = new FormData();
  //   //  postData.append("image_path",image_path)
  //   return this.http.post(API_URL, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )   
  // }
  //Get all restaurants
  
   
  GetRestaurants() {
    return this.http.get(`${this.endpoint}`);
  }
   // Get restaurant
   GetRestaurant(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-restaurant/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {} 
        }),
        catchError(this.errorMgmt)
      )
  }
    // Update restaurant
    UpdateRestaurant(id, data): Observable<any> {
      let API_URL = `${this.endpoint}/update-restaurant/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers })
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Delete restaurant
    DeleteRestaurant(id): Observable<any> {
      var API_URL = `${this.endpoint}/delete-restaurant/${id}`;
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
