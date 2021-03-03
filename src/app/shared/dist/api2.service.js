"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Api2Service = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var rxjs_2 = require("rxjs");
var Api2Service = /** @class */ (function () {
    function Api2Service(http, router) {
        this.http = http;
        this.router = router;
        this.hotels = [];
        this.hotelsUpdated = new rxjs_2.Subject();
        this.endpoint = 'http://localhost:8008/api';
        this.endpointCategory = 'http://localhost:8010/api';
        this.headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
    }
    // Add hotel
    Api2Service.prototype.AddHotel = function (name, style, deals, amenities, rooms, images, map, classh, Pricedeals, popular, languageSpoken) {
        var _this = this;
        var hotel = {
            name: name, style: style, deals: deals, amenities: amenities, rooms: rooms,
            map: map, "class": classh, Pricedeals: Pricedeals, popular: popular, langaugeSpoken: languageSpoken
        };
        this.http
            .post(this.endpoint + "/add-hotel", hotel)
            .subscribe(function (responseData) {
            // const id = responseData.id;
            // hotel.id = id;
            _this.hotels.push(hotel);
            _this.hotelsUpdated.next(__spreadArrays(_this.hotels));
            _this.router.navigate(["/hotel-list"]);
        });
    };
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
    Api2Service.prototype.GetHotels = function () {
        return this.http.get("" + this.endpoint);
    };
    // Get all hotel categories
    /*   GetHotelCategories() {
       return this.http.get(`${this.endpointCategory}`);
     }
    */
    // Get restaurant
    Api2Service.prototype.GetHotel = function (id) {
        var API_URL = this.endpoint + "/read-hotel/" + id;
        return this.http.get(API_URL, { headers: this.headers })
            .pipe(operators_1.map(function (res) {
            return res || {};
        }), operators_1.catchError(this.errorMgmt));
    };
    // Update hotel
    Api2Service.prototype.UpdateHotel = function (id, data) {
        var API_URL = this.endpoint + "/update-hotel/" + id;
        return this.http.put(API_URL, data, { headers: this.headers })
            .pipe(operators_1.catchError(this.errorMgmt));
    };
    // Delete hotel
    Api2Service.prototype.DeleteHotel = function (id) {
        var API_URL = this.endpoint + "/delete-hotel/" + id;
        return this.http["delete"](API_URL)
            .pipe(operators_1.catchError(this.errorMgmt));
    };
    // Error handling 
    Api2Service.prototype.errorMgmt = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        console.log(errorMessage);
        return rxjs_1.throwError(errorMessage);
    };
    Api2Service = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Api2Service);
    return Api2Service;
}());
exports.Api2Service = Api2Service;
