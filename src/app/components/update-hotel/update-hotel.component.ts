import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Api2Service } from './../../shared/api2.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.css']
})
export class UpdateHotelComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resethotelForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hotelForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private hotelApi: Api2Service
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.hotelApi.GetHotel(id).subscribe(data => {
      console.log(data.subjects)
      this.subjectArray = data.subjects;
      this.hotelForm = this.fb.group({
        name: [data.name, [Validators.required]],
        booking: [data.booking, [Validators.required]],
        map: [data.map, [Validators.required]],
        Pricedeals: [data.Pricedeals],
        rooms: [data.rooms, [Validators.required]],
        images: [data.images]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.hotelForm = this.fb.group({
      name: ['', [Validators.required]],
      booking: ['', [Validators.required]],
      map: ['', [Validators.required]],
      Pricedeals: [''],
      rooms: ['', [Validators.required]],
      images: ['']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.hotelForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.hotelForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateHotelForm() {
    console.log(this.hotelForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.hotelApi.UpdateHotel(id, this.hotelForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/hotel-list'))
      });
    }
  }
  
}
