import { mimeType } from './../../shared/mime-type.validator';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';


export interface Feature {
  name: string;
}
export interface Establishment {
  name: string;
}
export interface Meal {
  name: string;
}
export interface Cuisine {
  name: string;
}
export interface Dietary {
  name: string;
}
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList') chipList;
  @ViewChild('chipList2') chipList2;
  @ViewChild('chipList3') chipList3;
  @ViewChild('chipList4') chipList4;
  @ViewChild('chipList5') chipList5;
  @ViewChild('resetRestaurantForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  restaurantForm: FormGroup;
  imagePreview: string;
  featuresArray: Feature[] = [];
  establishmentArray: Establishment[] = [];
  cuisineArray: Cuisine[] = [];
  dietaryArray: Dietary[] = [];
  mealArray: Meal[] = [];


  ngOnInit(): void {
    this.submitBookForm();
  }
  constructor(public fb: FormBuilder,
    public router: Router,
    private ngZone: NgZone,
    public restaurantApi: ApiService) {
  }
  /* Reactive book form */
  submitBookForm() {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      image_path: ['', {
        Validators: [Validators.required],
         asyncValidators: [mimeType]
      }],
      restaurant_features: [this.featuresArray],
      establishment_type: [this.establishmentArray],
      meals: [this.mealArray],
      price_range: ['', [Validators.required]],
      cuisine: [this.cuisineArray],
      dietary_restrictions: [this.dietaryArray],
      location: ['', [Validators.required]],
      phone: ['', [Validators.required]],

    })
  }
  /* Add restaurant feature */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add feature
    if ((value || '').trim() && this.featuresArray.length < 10) {
      this.featuresArray.push({ name: value.trim() })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove restaurant feature */
  remove(feature: Feature): void {
    const index = this.featuresArray.indexOf(feature);
    if (index >= 0) {
      this.featuresArray.splice(index, 1);
    }
  }

  /* Add establishment type*/
  addEstablishment(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add establishment
    if ((value || '').trim() && this.establishmentArray.length < 10) {
      this.establishmentArray.push({ name: value.trim() })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove establishment type */
  removeEstablishment(establishment: Establishment): void {
    const index = this.establishmentArray.indexOf(establishment);
    if (index >= 0) {
      this.establishmentArray.splice(index, 1);
    }
  }
  /* Add meals */
  addMeals(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add Meals
    if ((value || '').trim() && this.mealArray.length < 10) {
      this.mealArray.push({ name: value.trim() })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove meals */
  removeMeals(meal: Meal): void {
    const index = this.mealArray.indexOf(meal);
    if (index >= 0) {
      this.mealArray.splice(index, 1);
    }
  }
  /* Add cuisines*/
  addCuisine(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add Cuisines
    if ((value || '').trim() && this.cuisineArray.length < 10) {
      this.cuisineArray.push({ name: value.trim() })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove meals */
  removeCuisines(cuisine: Cuisine): void {
    const index = this.cuisineArray.indexOf(cuisine);
    if (index >= 0) {
      this.cuisineArray.splice(index, 1);
    }
  }
  /* Add restrictions*/
  addRestriction(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add Restrictions
    if ((value || '').trim() && this.dietaryArray.length < 10) {
      this.dietaryArray.push({ name: value.trim() })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove restrictions */
  removeRestriction(dietary: Dietary): void {
    const index = this.dietaryArray.indexOf(dietary);
    if (index >= 0) {
      this.dietaryArray.splice(index, 1);
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.restaurantForm.patchValue({ image_path: file });
    this.restaurantForm.get('image_path').updateValueAndValidity();
    // console.log(file);
    // console.log(this.restaurantForm)
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.restaurantForm.controls[controlName].hasError(errorName);
  }
  /* Submit book */
  //  submitRestaurantForm() {
  //    // if (this.restaurantForm.invalid) {
  //    //   return;
  //   //  } 
  //   console.log("pressed1"); 
  //   // shetl valid ===> this.restaurantForm.valid
  //   if (this.restaurantForm) {
  //     console.log("pressed");
  //     this.restaurantApi.AddRestaurant(this.restaurantForm.value).subscribe(res => {
  //       this.ngZone.run(() => this.router.navigateByUrl('/restaurant-list'))
  //     }, (error) => {
  //       console.log(error);
  //     }); 
  //   }
  // }
  submitRestaurantForm() { 
    this.restaurantApi.AddRestaurant(
      this.restaurantForm.value.name,
      this.restaurantForm.value.image_path,
      this.restaurantForm.value.restaurant_features,
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
          
          this.router.navigateByUrl('/restaurant-list') 
      } 
    }) 
  }

}
