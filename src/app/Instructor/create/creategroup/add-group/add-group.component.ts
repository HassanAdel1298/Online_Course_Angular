import { Component, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { AllCoursesComponent } from '../../../all-courses/all-courses.component';
import { GradeService } from '../../../../../Service/grade.service';
//import { DashBoardGradeOneComponent } from '../dash-board-grade/dash-board-grade.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GroupService } from '../../../../../Service/group.service';
import { AccountService } from '../../../../../Service/Account.service';
import { CourseService } from '../../../../../Service/course.service';
import { DashBoardGradeOneComponent } from '../dash-board-grade/dash-board-grade.component';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [
    RouterModule,
    AllCoursesComponent,
    CommonModule,
    RouterLink,
    DashBoardGradeOneComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [GradeService, AccountService, CourseService],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css',
})
export class AddGroupComponent {
  
  Grades: any;
  //course_id = 1;
  instructor_id: any;
  //check : Boolean = false;
  selectedGrade: any;
  courses: any;
  selectedCourse: any;

  private async getAccountID(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AccountService.GetID().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

  constructor(
    private readonly GradeService: GradeService,
    private readonly CourseService: CourseService,
    private router: Router,
    private AccountService: AccountService,
    private GroupService: GroupService
  ) {
    //this.grade_ID = 0;
  }
  groupNameValidator() {
    return (control: { value: string }) => {
      const value = control.value;
      const containsLetter = /[a-zA-Z]/.test(value);
      const containsNumber = /[0-9]/.test(value);

      if (!containsLetter && containsNumber ) {
        return { invalidGroupName: true };
      }

      return null;
    };
  }

  myform = new FormGroup({
    groupName: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required,
      this.groupNameValidator()
    ]),
    selectedGrade: new FormControl(null, [Validators.required]),
    selectedCourse: new FormControl(null,[Validators.required]),
    Price: new FormControl(null, [Validators.required , Validators.min(1),Validators.max(1000)])
  });

  async chooseGrade() {
    try {
      console.log(this.selectedGrade);
      console.log(this.myform.controls.selectedGrade.value);
      const data = await this.CourseService.getCourseByGradeID(this.myform.controls.selectedGrade.value).toPromise();
      this.courses = data;
    } catch (err) {
      console.error(err);
      // Handle error if necessary
    }
  }

  // async chooseGrade() {
  //   await console.log(this.selectedGrade);
  //   console.log(this.Grades);

  //   this.CourseService.getCourseByGradeID(this.selectedGrade).subscribe({
  //     next: (data) => {
  //       this.courses = data;
  //     },
  //     error: (err) => {
  //       this.router.navigate([
  //         '/Error',
  //         { errormessage: err.message as string },
  //       ]);
  //     },
  //   });
  // }

  submit() {
    
    if(this.myform.valid){
      var data = {
        groupName: this.myform.controls.groupName.value,
        num_Students: 0,
        creation_Date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        end_Date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        price: this.myform.controls.Price.value,
        instructor_ID: this.instructor_id,
        course_ID: this.myform.controls.selectedCourse.value
      };
  
      // console.log(data)
      // console.log(this.myform.controls.selectedCourse.value)
  
      this.GroupService.AddNewGroup(data).subscribe({
        next: (data) => this.router.navigate(['/Instructordashboard']),
        error: (err) => console.log('sorry there is an error when add'),
      });
    }
    

  }


  // get groupNameValid() {
  //   return this.myform.controls['groupName'].valid;
  // }
  
  // get PriceValid() {
  //   return this.myform.controls['Price'].valid;
  // }

  // get selectedGradeValid() {
  //   return this.myform.controls['selectedGrade'].valid;
  // }
  
  // get selectedCourseValid() {
  //   return this.myform.controls['Price'].valid;
  // }

  async ngOnInit(): Promise<void> {
    const instructor_id = await this.getAccountID();
    this.instructor_id = instructor_id;

    this.GradeService.getAllGrades().subscribe({
      next: (data) => {
        this.Grades = data;
      },
      error: (err) => {
        this.router.navigate([
          '/Error',
          { errormessage: err.message as string },
        ]);
      },
    });
  }

  // onchange(grade_ID: any) {
  //   this.grade_ID = grade_ID;

  // }

  // showDashBoard: boolean = false;

  // showAddGroup() {
  //   this.showDashBoard = true;
  // }

  // hideAddGroup() {
  //   this.showDashBoard = false;
  // }
}
