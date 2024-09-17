import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { max } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructordatatwo',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  providers: [],
  templateUrl: './instructordatatwo.component.html',
  styleUrl: './instructordatatwo.component.css',
})
export class InstructordatatwoComponent {
  constructor() {}

  myform = new FormGroup({
    country: new FormControl(null, [Validators.required]),
    City: new FormControl(null, [
      Validators.min(2),
      Validators.max(10),
      Validators.required,
    ]),
    Details: new FormControl(null, [
      Validators.min(4),
      Validators.max(100),
      Validators.required,
    ]),
  });
  submit() {
    // const data = {
    //   country: this.myform.value.country,
    //   city: this.myform.value.City,
    //   spicifyaddress: this.myform.value.Details,
    // };
    // this.myservice.addistructoraddress(data).subscribe({
    //   next: (data) => alert('add successfully'),
    //   error: (err) => alert('sorry there is an error when add'),
    // });
  }

  get country() {
    return this.myform.controls['country'].valid;
  }
  get City() {
    return this.myform.controls['City'].valid;
  }
  get Details() {
    return this.myform.controls['Details'].valid;
  }
}
