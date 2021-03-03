
import { Injectable } from '@angular/core';
import { Hotel } from './hotel';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class Api2Service {
  private hotels: Hotel[] = [];
  private hotelsUpdated = new Subject<Hotel[]>();
  endpoint: string = 'http://localhost:8008/api';
  endpointCategory: string = 'http://localhost:8010/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  // Add hotel

  AddHotel(name: string, style: Array<string>, deals: Array<string>, amenities: Array<string>, rooms: number, images: File,
    map: Object, classh: string, Pricedeals: Array<object>, popular: Array<string>,
    languageSpoken: Array<string>) {
    const hotel: Hotel = {
      name: name, style: style, deals: deals, amenities: amenities, rooms: rooms,
      map: map, class: classh, Pricedeals: Pricedeals, popular: popular, langaugeSpoken: languageSpoken,
    };

    this.http
      .post<{ message: string; id: string }>(
        `${this.endpoint}/add-hotel`,
        hotel
      )
      .subscribe(responseData => {
        // const id = responseData.id;
        // hotel.id = id;
        this.hotels.push(hotel);
        this.hotelsUpdated.next([...this.hotels]);
        this.router.navigate(["/hotel-list"]);
      });
  }

  //  AddHotel(name: string): Observable<any> {
  //   var formData: any = new FormData(); 
  //   formData.append("name", name);
  //   return this.http.post<Hotel>(`${this.endpoint}/add-hotel`, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  // }
  //  AddHotel(data: Hotel): Observable<any> {
  //   let API_URL = `${this.endpoint}/add-hotel`;
  //   return this.http.post(API_URL, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     ) 
  // }
  // Get all hotels

  GetHotels() {
    return this.http.get(`${this.endpoint}`);
  }
  // Get all hotel categories
  /*   GetHotelCategories() { 
     return this.http.get(`${this.endpointCategory}`);
   }
  */
  // Get restaurant
  GetHotel(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-hotel/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Update hotel
  UpdateHotel(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update-hotel/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete hotel
  DeleteHotel(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-hotel/${id}`;
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



