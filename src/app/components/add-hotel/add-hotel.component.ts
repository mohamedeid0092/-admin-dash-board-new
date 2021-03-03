
import { HotelCategory } from './../../shared/hotel-category';
import { mimeType } from './../../shared/mime-type.validator';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Api2Service } from './../../shared/api2.service';
import { Api3Service } from './../../shared/api3.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';


export interface Distance {
  mainStreet: number,
  beach: number,
  park: number,
  cityCenter: number
}
export interface PriceDeals {
  _id?: string,
  name?: string,
  link?: string,
  pricePerNight?: number
}
export interface Map {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  styleslist = ["Family-Friendly", "Romantic", "Business"]

  @ViewChild('chipList') chipList;
  @ViewChild('chipList2') chipList2;
  @ViewChild('resetHotelForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hotelForm: FormGroup;
  images: [];
  deals: string[] = [];
  popular: string[] = [];
  amenities: string[] = [];
  style: string[] = [];
  map: Map[] = [];
  rooms: number;
  distance: Distance;
  pricedeals: PriceDeals[] = [];
  langaugeSpoken: string[] = [];
  HotelCategoryData: any = [];
  categories: HotelCategory;
  class: string;
  imagePreview = [];
  myFiles = [];
  // checkedStyles:any = [];
  constructor(public fb: FormBuilder,
    public router: Router,
    private ngZone: NgZone,
    public hotelApi: Api2Service,
    public hotelCategoryApi: Api3Service) {
    this.hotelCategoryApi.GetHotelCategories().subscribe(data => {
      this.HotelCategoryData = data;
      console.log(this.HotelCategoryData)
    })

  }

  ngOnInit(): void {
    this.HotelFormData();

  }

  HotelFormData() {
    this.hotelForm = this.fb.group({
      images: [[], {
        Validators: [Validators.required],
        asyncValidators: [mimeType]
      }],
      deals: [this.deals],
      amenities: [this.amenities],
      style: [this.style],
      name: ['', [Validators.required]],
      map: [this.map],
      rooms: ['', [Validators.required]],
      distance: [this.distance],
      Pricedeals: [this.pricedeals],
      class: [this.class, [Validators.required]],
      popular: [this.popular],
      langaugeSpoken: [this.langaugeSpoken]
    })
  }





  changeOutputStyle(event) {
    console.log(event);
    if (event.checked) {
      // this.checkedStyles.push(event.source.value);
      this.style.push(event.source.value)
      // console.log( this.checkedStyles);
      console.log(this.style);
    } else {
      // this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
      this.style = this.style.filter((p) => p !== event.source.value)
      // console.log(this.checkedStyles);
      console.log(this.style);
    }
  }

  changeOutputDeals(event) {
    console.log(event);
    if (event.checked) {
      // this.checkedStyles.push(event.source.value);
      this.deals.push(event.source.value)
      // console.log( this.checkedStyles);
      console.log(this.deals);
    } else {
      // this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
      this.deals = this.deals.filter((p) => p !== event.source.value)
      // console.log(this.checkedStyles);
      console.log(this.deals);
    }
  }
  changeOutputAmenities(event) {
    console.log(event);
    if (event.checked) {
      // this.checkedStyles.push(event.source.value);
      this.amenities.push(event.source.value)
      // console.log( this.checkedStyles);
      console.log(this.amenities);
    } else {
      // this.checkedStyles=this.checkedStyles.filter((p)=>p!==event.source.value);
      this.amenities = this.amenities.filter((p) => p !== event.source.value)
      // console.log(this.checkedStyles);
      console.log(this.amenities);
    }
  }
  changeOutputPopular(event) {
    console.log(event);
    if (event.checked) {
      this.popular.push(event.source.value)
      console.log(this.popular);
    } else {
      this.popular = this.popular.filter((p) => p !== event.source.value);
      console.log(this.popular);
    }
  }

  changeOutputlanguageSpoken(event) {
    console.log(event);
    if (event.checked) {
      this.langaugeSpoken.push(event.source.value)
      console.log(this.langaugeSpoken);
    } else {
      this.langaugeSpoken = this.langaugeSpoken.filter((p) => p !== event.source.value);
      console.log(this.langaugeSpoken);
    }
  }


  onImagePicked(event) {
    // const file = (event.target as HTMLInputElement).files;
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push((event.target.files[i]));
      this.hotelForm.patchValue({ images: this.myFiles });
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (event: any) => {
        this.imagePreview.push(event.target.result)
      };

    }
    this.hotelForm.get('images').updateValueAndValidity();
    console.log(this.myFiles);
    // console.log(this.restaurantForm)
  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.hotelForm.controls[controlName].hasError(errorName);
  }

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
  submitHotelForm() {

    // console.log(this.style)
    if (this.hotelForm) {/*  */
      //   this.checkedStyles.forEach(item => {  
      //     this.style.push(item);  
      // });
      this.hotelApi.AddHotel(this.hotelForm.value.name, this.hotelForm.value.style,
        this.hotelForm.value.images,
        this.hotelForm.value.deals, this.hotelForm.value.amenities, this.hotelForm.value.rooms,
        this.hotelForm.value.map, this.hotelForm.value.class, this.hotelForm.value.Pricedeals,
        this.hotelForm.value.popular, this.hotelForm.value.langaugeSpoken)
      console.log(this.hotelForm.value.style)
      console.log(this.hotelForm.value.deals)
      console.log(this.hotelForm.value.rooms)
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

  }


}
