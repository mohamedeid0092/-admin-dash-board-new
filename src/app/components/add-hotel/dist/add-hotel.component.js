"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddHotelComponent = void 0;
var mime_type_validator_1 = require("./../../shared/mime-type.validator");
var core_1 = require("@angular/core");
var keycodes_1 = require("@angular/cdk/keycodes");
var forms_1 = require("@angular/forms");
var AddHotelComponent = /** @class */ (function () {
    // checkedStyles:any = [];
    function AddHotelComponent(fb, router, ngZone, hotelApi, hotelCategoryApi) {
        var _this = this;
        this.fb = fb;
        this.router = router;
        this.ngZone = ngZone;
        this.hotelApi = hotelApi;
        this.hotelCategoryApi = hotelCategoryApi;
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.styleslist = ["Family-Friendly", "Romantic", "Business"];
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA];
        this.deals = [];
        this.popular = [];
        this.amenities = [];
        this.style = [];
        this.map = [];
        this.pricedeals = [];
        this.langaugeSpoken = [];
        this.HotelCategoryData = [];
        this.imagePreview = [];
        this.myFiles = [];
        /* Get errors */
        this.handleError = function (controlName, errorName) {
            return _this.hotelForm.controls[controlName].hasError(errorName);
        };
        this.hotelCategoryApi.GetHotelCategories().subscribe(function (data) {
            _this.HotelCategoryData = data;
            console.log(_this.HotelCategoryData);
        });
    }
    AddHotelComponent.prototype.ngOnInit = function () {
        this.HotelFormData();
    };
    AddHotelComponent.prototype.HotelFormData = function () {
        this.hotelForm = this.fb.group({
            images: [[], {
                    Validators: [forms_1.Validators.required],
                    asyncValidators: [mime_type_validator_1.mimeType]
                }],
            deals: [this.deals],
            amenities: [this.amenities],
            style: [this.style],
            name: ['', [forms_1.Validators.required]],
            map: [this.map],
            rooms: ['', [forms_1.Validators.required]],
            distance: [this.distance],
            Pricedeals: [this.pricedeals],
            "class": [this["class"], [forms_1.Validators.required]],
            popular: [this.popular],
            langaugeSpoken: [this.langaugeSpoken]
        });
    };
    AddHotelComponent.prototype.changeOutputStyle = function (event) {
        console.log(event);
        if (event.checked) {
            // this.checkedStyles.push(event.source.value);
            this.style.push(event.source.value);
            // console.log( this.checkedStyles);
            console.log(this.style);
        }
        else {
            // this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
            this.style = this.style.filter(function (p) { return p !== event.source.value; });
            // console.log(this.checkedStyles);
            console.log(this.style);
        }
    };
    AddHotelComponent.prototype.changeOutputDeals = function (event) {
        console.log(event);
        if (event.checked) {
            // this.checkedStyles.push(event.source.value);
            this.deals.push(event.source.value);
            // console.log( this.checkedStyles);
            console.log(this.deals);
        }
        else {
            // this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
            this.deals = this.deals.filter(function (p) { return p !== event.source.value; });
            // console.log(this.checkedStyles);
            console.log(this.deals);
        }
    };
    AddHotelComponent.prototype.changeOutputAmenities = function (event) {
        console.log(event);
        if (event.checked) {
            // this.checkedStyles.push(event.source.value);
            this.amenities.push(event.source.value);
            // console.log( this.checkedStyles);
            console.log(this.amenities);
        }
        else {
            // this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
            this.amenities = this.amenities.filter(function (p) { return p !== event.source.value; });
            // console.log(this.checkedStyles);
            console.log(this.amenities);
        }
    };
    AddHotelComponent.prototype.changeOutputPopular = function (event) {
        console.log(event);
        if (event.checked) {
            this.popular.push(event.source.value);
            console.log(this.popular);
        }
        else {
            this.popular = this.popular.filter(function (p) { return p !== event.source.value; });
            console.log(this.popular);
        }
    };
    AddHotelComponent.prototype.changeOutputlanguageSpoken = function (event) {
        console.log(event);
        if (event.checked) {
            this.langaugeSpoken.push(event.source.value);
            console.log(this.langaugeSpoken);
        }
        else {
            this.langaugeSpoken = this.langaugeSpoken.filter(function (p) { return p !== event.source.value; });
            console.log(this.langaugeSpoken);
        }
    };
    AddHotelComponent.prototype.onImagePicked = function (event) {
        var _this = this;
        // const file = (event.target as HTMLInputElement).files;
        for (var i = 0; i < event.target.files.length; i++) {
            this.myFiles.push((event.target.files[i]));
            this.hotelForm.patchValue({ images: this.myFiles });
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[i]);
            reader.onload = function (event) {
                _this.imagePreview.push(event.target.result);
            };
        }
        this.hotelForm.get('images').updateValueAndValidity();
        console.log(this.myFiles);
        // console.log(this.restaurantForm)
    };
    /* Submit hotel */
    // submitHotelForm() { 
    //   this.hotelApi.AddHotel(
    //    this.hotelForm.value
    //   ).subscribe((event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.Response:
    //         console.log('User successfully created!', event.body);
    //         this.router.navigateByUrl('/hotel-list') 
    //     } 
    //   }) 
    // }      
    AddHotelComponent.prototype.submitHotelForm = function () {
        // console.log(this.style)
        if (this.hotelForm) { /*  */
            //   this.checkedStyles.forEach(item => {  
            //     this.style.push(item);  
            // });
            this.hotelApi.AddHotel(this.hotelForm.value.name, this.hotelForm.value.style, this.hotelForm.value.images, this.hotelForm.value.deals, this.hotelForm.value.amenities, this.hotelForm.value.rooms, this.hotelForm.value.map, this.hotelForm.value["class"], this.hotelForm.value.Pricedeals, this.hotelForm.value.popular, this.hotelForm.value.langaugeSpoken);
            console.log(this.hotelForm.value.style);
            console.log(this.hotelForm.value.deals);
            console.log(this.hotelForm.value.rooms);
            // this.hotelApi.AddHotel(this.hotelForm.value).subscribe(res => {
            //   this.ngZone.run(() => this.router.navigateByUrl('/hotel-list'))
            // });
            /* this.hotelApi.AddHotel(
              this.hotelForm.value.name,
              this.hotelForm.value.style
            ).subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Sent:
                  console.log('Request has been made!');
                  break;
                case HttpEventType.ResponseHeader:
                  console.log('Response header has been received!');
                  break;
                
                case HttpEventType.Response:
                  console.log('User successfully created!', event.body);
                  
                  this.router.navigateByUrl('/hotel-list')
              }
            })  */
        }
    };
    __decorate([
        core_1.ViewChild('chipList')
    ], AddHotelComponent.prototype, "chipList");
    __decorate([
        core_1.ViewChild('chipList2')
    ], AddHotelComponent.prototype, "chipList2");
    __decorate([
        core_1.ViewChild('resetHotelForm')
    ], AddHotelComponent.prototype, "myNgForm");
    AddHotelComponent = __decorate([
        core_1.Component({
            selector: 'app-add-hotel',
            templateUrl: './add-hotel.component.html',
            styleUrls: ['./add-hotel.component.css']
        })
    ], AddHotelComponent);
    return AddHotelComponent;
}());
exports.AddHotelComponent = AddHotelComponent;
