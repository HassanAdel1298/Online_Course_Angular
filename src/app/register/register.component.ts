import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JwtService } from '../../Service/jwt.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, FormsModule, CommonModule],
  providers: [JwtService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  show: boolean = false;
  registrationForm: FormGroup;

  emailExists = false;

  usernameExists = false;

  errormessage: any;
  registrationSuccess: boolean = false;


  constructor(
    private fb: FormBuilder,
    private registrationService: JwtService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[^\d]*$/),]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^\S*$/),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^.{3,}@gmail.com$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  onSubmit() {
    this.show = true;

    if (this.registrationForm.valid) {
      this.registrationService.register(this.registrationForm.value).subscribe({
        next: (data) => {
          // alert("Success Registration");
          // console.log('Success Registration', response);
          // this.router.navigate(['/Login']);

          // const userType = this.registrationForm.value.role;
          // if (userType === 'Student') {
          //   this.router.navigate(['/Login']);
          // } else if (userType === 'Instructor') {
          //   this.router.navigate(['/Dashboard']);
          // }
          this.registrationSuccess = true;
          console.log('registration');
          setTimeout(() => {
            
            this.router.navigate(['/Login']);
            this.registrationSuccess = false;
          }, 3000);
         
        },
        error: (err) => {
          console.log(err.error);
          this.errormessage = err.error;
          this.show = false;
        },
      });
    }
  }

  passwordMatchValidator(re: FormGroup) {
    const passwordGet = re.get('password');
    const getconfirmPassword = re.get('confirmPassword');

    if (passwordGet && getconfirmPassword) {
      const password = passwordGet.value;
      const confirmPassword = getconfirmPassword.value;

      if (password !== confirmPassword) {
        getconfirmPassword.setErrors({ passwordMismatch: true });
      } else {
        getconfirmPassword.setErrors(null);
      }
    }
  }
}

// myform = new FormGroup({

//   name: new FormControl("", [Validators.required,
//   Validators.pattern(/^[A-Za-z]+(?:[ \-'][A-Za-z]+)*$/)]),

//   username: new FormControl("", [
//     Validators.required,
//     Validators.pattern('^[a-zA-Z0-9._-]{3,20}$')]),

//   email: new FormControl("", [Validators.required,
//   Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),

//   phone: new FormControl("", [
//     Validators.required,
//     Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]),

//   password: new FormControl("", [
//     Validators.required,
//     Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()-_=+{};:,<.>?[\\]\\\\/]{8,20}$')]),
// }

// )

// get namevalied() {
//   return this.myform.controls["name"].valid;
// }

// get username() {
//   return this.myform.controls["username"].valid;
// }

// get email() {
//   return this.myform.controls["email"].valid;
// }

// get password() {
//   return this.myform.controls["password"].valid;
// }

// get phone() {
//   return this.myform.controls["phone"].valid;
// }

// addnewuser() {
//   if (this.myform.valid) {

//     let newuser = {
//       userName: this.myform.controls.username.value as string,
//       password: this.myform.controls.password.value as string,
//       confirmPassword: this.myform.controls.password.value as string,
//       email: this.myform.controls.email.value as string,
//       role: this.myform.controls.name.value as string

//     };
//     this.data.AddNewUser(newuser).subscribe();
//     this.router.navigate(['/']);
//   }
// }
