// import { Component, Input, input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Component, Input } from '@angular/core';
// import { ActivatedRoute, RouterLink } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { GroupService } from '../../../../Service/group.service';
import { InstructorService } from '../../../../Service/instructor.service';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, FormsModule, CoursesComponent],
  providers: [GroupService,InstructorService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  @Input() Groupid: any;
  id = 0;
  Group : any;
  Instructor : any


  constructor(private router: Router, private Actived: ActivatedRoute ,
     private GroupService : GroupService ,  private InstructorService : InstructorService  ) {  }



  ngOnInit(): void {


    this.GroupService.getGroupByID(this.Groupid).subscribe({
      next:(data)=>{
        this.Group = data;
      },
      error:(err)=>{
        //this.router.navigate(['/Error',{errormessage : err.message as string}]);
      }
    })

    var instructor_ID = this.Group.instructor_ID;

    // this.InstructorService.getInstructorByID(instructor_ID).subscribe({
    //   next:(data)=>{
    //     this.Instructor = data;
    //   },
    //   error:(err)=>{
    //     this.router.navigate(['/Error',{errormessage : err.message as string}]);
    //   }
    // })

   }

  // constructor(
  //   myActivat: ActivatedRoute,
  //   private myservic: CourseibrahemService
  // ) {
  //   this.id = myActivat.snapshot.params['id'];
  // }
  // ngOnInit(): void {
  //   this.myservic.getcoursebyid(this.id).subscribe({
  //     next: (data: any) => (this.course = data),

  //     error: (err) => console.log(err),
  //   });
  // }
}
