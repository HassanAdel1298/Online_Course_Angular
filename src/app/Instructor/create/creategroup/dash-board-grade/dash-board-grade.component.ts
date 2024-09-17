import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { GradeService } from '../../../../../Service/grade.service';
import { CourseService } from '../../../../../Service/course.service';
import { GroupService } from '../../../../../Service/group.service';

@Component({
  selector: 'app-dash-board-grade-one',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './dash-board-grade.component.html',
  providers: [CourseService,GroupService,GradeService],
  styleUrl: './dash-board-grade.component.css',
})
export class DashBoardGradeOneComponent {
  
  instructor_ID: any;
  @Input() grade_ID: any;
  courses: any;
  course_ID: any;
  grade : any;

  // items = [
  //   { imageUrl: 'assets/images/Arabic.jpeg', text: 'Arabic' },
  //   { imageUrl: 'assets/images/Math.jpeg', text: 'Math' },
  //   { imageUrl: 'assets/images/SCience.jpeg', text: 'Science' },
  //   { imageUrl: 'assets/images/English.jpeg', text: 'English' },
  //   { imageUrl: 'assets/images/History.jpeg', text: 'History' },
  //   { imageUrl: 'assets/images/Computer.jpeg', text: 'Computer' },

  // ];

  constructor(private CourseService: CourseService, private GroupService : GroupService,
    private GradeService: GradeService, private router: Router) {
    this.instructor_ID = 1;
  }

  ngOnInit(): void {

    this.GradeService.getGradeByID(this.grade_ID).subscribe({
      next:(data)=>{
        this.grade = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errormessage : err.message as string}]);
      }
    })

    this.CourseService.getCourseByGradeID(this.grade_ID).subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string },
        ]);
      },
    });
  }

  // selectedSubject: string | null = null;
  // subjects = ['Math', 'Arabic', 'Science', 'English', 'Social Studies'];
  //Grade:string="GradeOne";
  // CourseName:any;
  // CoursePrice:number=0;
  //constructor(private courseService: CourseibrahemService) {this.profileForm.reset();}

  trackByFn(index: number, item: any): any {
    return item.grade_ID;
  }

  profileForm = new FormGroup({
    courseName: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(300),
      Validators.required,
    ]),
    coursePrice: new FormControl(0, [
      Validators.min(0),
      Validators.max(1000),
      Validators.required,
    ]),
    subject: new FormControl(0, Validators.required),
  });
  // submitForm(form: NgForm) {
  //   const formData = {
  //     subject: this.selectedSubject,
  //     Grade:this.Grade,
  //     CourseName:this.CourseName,
  //     CoursePrice:this.CoursePrice
  //   };

  //   this.courseService.addCourse(formData).subscribe(
  //     {
  //       next:(data)=>{
  //         console.log(data);
  //         form.reset();
  //       },
  //       error:(err)=>{console.log(err)}
  //     }
  //   );
  // }

  onchange(course_ID : any) {
    this.course_ID = course_ID
  }

  onSubmit() {
    const formData = {
      course_ID: this.course_ID,
      groupName: this.profileForm.value.courseName,
      price: this.profileForm.value.coursePrice,
      creation_Date: Date.now,
      num_Students: 0,
      instructor_ID: this.instructor_ID,
    };

    // this.GroupService.AddNewGroup(formData).subscribe({
    //   next: (data) => {
    //     // this.profileForm.reset({subject:-1, CourseName:null});
    //     this.profileForm.reset();

    //     window.alert(
    //       'New Group: ' +
    //         this.profileForm.value.courseName +
    //         ' Added Sucsessfly'
    //     );
    //   },
    //   error: (err) => {
    //     window.alert(
    //       'sorry there is an error when add: ' +
    //         this.profileForm.value.courseName +
    //         ' group'
  //       );
  //     },
  //   });
   }

  get nameValid() {
    return this.profileForm.controls['courseName'].valid;
  }

  get priceValid() {
    return this.profileForm.controls['coursePrice'].valid;
  }

  get subjectValid() {
    return this.profileForm.controls['subject'].valid;
  }
}
