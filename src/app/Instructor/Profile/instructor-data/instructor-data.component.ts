import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructor-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  providers:[
  ],
  templateUrl: './instructor-data.component.html',
  styleUrl: './instructor-data.component.css'
})
export class InstructorDataComponent {

constructor(){}
birthdate:any

myform = new FormGroup({
  firstname:new FormControl(null,[Validators.min(3),Validators.max(100),Validators.required]),
  lastname:new FormControl(null,[Validators.min(3),Validators.max(100),Validators.required]),
  gender:new FormControl(null),
  birthdate: new FormControl(null),
  about:new FormControl(null,[Validators.min(5),Validators.max(300)])
});
submit() {
  // const data={
  //   firstname:this.myform.value.firstname,
  //   lastname:this.myform.value.lastname,
  //   gender:this.myform.value.gender,
  //   birthdate:this.myform.value.birthdate,
  //   about:this.myform.value.about
  // };
  // this.myservice.addinstrutordata(data).subscribe({
  //   next:(data)=>alert("add successfully"+data) ,
  //   error:(err)=>alert("sorry there is an error when add")
  // })
  }

  get firstnamevalid()
  {
    return this.myform.controls["firstname"].valid;
  }
  get lastnamevalid()
  {
    return this.myform.controls["lastname"].valid;
  }
  get about()
  {
    return this.myform.controls["about"].valid;
  }
}
